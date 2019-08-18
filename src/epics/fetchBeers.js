import { concat, of, race, fromEvent, merge, forkJoin } from "rxjs";
import {
  map,
  switchMap,
  debounceTime,
  filter,
  catchError,
  delay,
  mapTo,
  withLatestFrom,
  pluck
} from "rxjs/operators";
import { ofType } from "redux-observable";
import {
  fetchFullfilled,
  SEARCH,
  setStatus,
  fetchFailed,
  CANCEL,
  reset,
  RANDOM
} from "../reducers/beersActions";

const search = (apiBase, perPage, term) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

const random = apiBase => `${apiBase}/random`;

export function fetchBeersEpic(action$, state$, { getJSON, document }) {
  return action$.pipe(
    ofType(RANDOM),
    debounceTime(500),
    withLatestFrom(state$.pipe(pluck("config"))),
    switchMap(([{ payload }, config]) => {
      const reqs = [...Array(config.perPage)].map(() => {
        return getJSON(random(config.apiBase)).pipe(pluck(0));
      });
      const ajax$ = forkJoin(reqs).pipe(
        // delay(5000),
        map(resp => fetchFullfilled(resp)),
        catchError(err => {
          return of(fetchFailed(err.response.message));
        })
      );

      const blocker$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, "keyup").pipe(
          filter(evt => evt.key === "Escape" || evt.key === "Esc")
        )
      ).pipe(mapTo(reset()));

      return concat(of(setStatus("pending")), race(ajax$, blocker$));
    })
  );
}
