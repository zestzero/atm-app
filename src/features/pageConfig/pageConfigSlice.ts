import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from 'types/currency';
import { Page, PageConfigState } from './types';

const initialState: PageConfigState = {
    currentPage: Page.LOGIN,
    currency: Currency.EUR,
};

const pageConfigSlice = createSlice({
    name: 'pageConfig',
    initialState,
    reducers: {
        changePage: {
            reducer: (state, action: PayloadAction<Page>) => {
                state.currentPage = action.payload;
            },
            prepare: (page: Page) => {
                return { payload: page };
            },
        },
    },
});

export const { changePage } = pageConfigSlice.actions;
export default pageConfigSlice.reducer;
