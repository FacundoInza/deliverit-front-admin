import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducers';
import { adminApi } from './services/adminApi';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
