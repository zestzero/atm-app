import { configureStore } from '@reduxjs/toolkit';
import pageConfigReducer from '../features/pageConfig/pageConfigSlice';

export const store = configureStore({
    reducer: {
        pageConfig: pageConfigReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
