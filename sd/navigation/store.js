import {createStore, compose, applyMiddleware, combineReducers} from 'redux';

export const SDCreateStore = reducers => {
  return createStore(
    combineReducers(reducers),
    undefined,
    compose(
      applyMiddleware(),
      // thunkMiddleware
    ),
  );
};
