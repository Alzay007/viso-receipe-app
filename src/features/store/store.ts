import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../reducers/recipesSlice';
import savedReducer from '../reducers/savedSlice';

export const store = configureStore({
  reducer: {
    recipesReducer,
    savedReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
