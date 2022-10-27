import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';

import { qnasReducer } from './reducers';

const rootReducer = combineReducers({
  qnas: qnasReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
