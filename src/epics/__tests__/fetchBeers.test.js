import { TestScheduler } from "rxjs/testing";
import {
  search,
  setStatus,
  fetchFullfilled,
  fetchFailed,
  cancel,
  reset
} from "../../reducers/beersActions";
import { of } from "rxjs";
import { initialState } from "../../reducers/configReducer";
import { fetchBeersEpic } from "../fetchBeers";
it("produces correct actions", function() {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot("a", {
      a: search("ship")
    });
    const state$ = of({
      config: initialState
    });
    const dependecies = {
      getJSON: url => {
        return cold("-a", {
          a: [{ name: "Beer 1" }]
        });
      }
    };
    const output$ = fetchBeersEpic(action$, state$, dependecies);
    expectObservable(output$).toBe("500ms ab", {
      a: setStatus("pending"),
      b: fetchFullfilled([{ name: "Beer 1" }])
    });
  });
});

it("produces correct actions (error)", function() {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot("a", {
      a: search("ship")
    });
    const state$ = of({
      config: initialState
    });
    const dependecies = {
      getJSON: url => {
        return cold("-#", null, {
          response: {
            message: "oopsie!"
          }
        });
      }
    };
    const output$ = fetchBeersEpic(action$, state$, dependecies);
    expectObservable(output$).toBe("500ms ab", {
      a: setStatus("pending"),
      b: fetchFailed("oopsie!")
    });
  });
});

it("produces correct actions (reset)", function() {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot("a 500ms -b", {
      a: search("ship"),
      b: cancel()
    });
    const state$ = of({
      config: initialState
    });
    const dependecies = {
      getJSON: url => {
        return cold("---a");
      }
    };
    const output$ = fetchBeersEpic(action$, state$, dependecies);
    expectObservable(output$).toBe("500ms a-b", {
      a: setStatus("pending"),
      b: reset()
    });
  });
});
