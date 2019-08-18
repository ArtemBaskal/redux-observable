import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { appReducer } from "./reducers/appReducers";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

import { fetchBeersEpic } from "./epics/fetchBeers";
import { beersReducers } from "./reducers/beersReducer";
import { configReducer } from "./reducers/configReducer";
import { persistEpic, hydrateEpic } from "./epics/persist";

// const epic1 = () =>
//   of({ type: "SET_NAME", payload: "Stephen" }).pipe(delay(2000));

export function configureStore(dependencies = {}) {
  const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      getJSON: ajax.getJSON,
      document,
      ...dependencies
    }
  });
  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducers,
    config: configReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
