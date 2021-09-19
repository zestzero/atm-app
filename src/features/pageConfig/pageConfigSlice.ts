import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Page, PageConfigState } from './types';

const initialState: PageConfigState = {
    currentPage: Page.LOGIN,
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
