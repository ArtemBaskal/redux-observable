export const FETCH_FULLFILLED = "FETCH_FULLFILLED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";
export const RANDOM = "RANDOM";
export const FETCH_FAILED = "FETCH_FAILED";
export const CANCEL = "CANCEL";
export const RESET = "RESET";

export function fetchFullfilled(beers) {
  return {
    type: FETCH_FULLFILLED,
    payload: beers
  };
}

export function fetchFailed(message) {
  return {
    type: FETCH_FAILED,
    payload: message
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function fetchData() {
  return {
    type: FETCH_DATA
  };
}

export function search(input) {
  return {
    type: SEARCH,
    payload: input
  };
}

export function cancel() {
  return {
    type: CANCEL
  };
}

export function reset() {
  return {
    type: RESET
  };
}

export function random() {
  return {
    type: RANDOM
  };
}
