import { configureStore } from '@reduxjs/toolkit';
import pageConfigReducer from 'features/pageConfig/pageConfigSlice';
import authenticationReducer from 'features/authentication/authenticationSlice';

export const store = configureStore({
    reducer: {
        pageConfig: pageConfigReducer,
        auth: authenticationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
