import { Currency } from 'types/currency';

export interface PageConfigState {
    currentPage: Page;
    currency: Currency;
}

export enum Page {
    LOGIN,
    WITHDRAW,
    ERROR,
    LOADING,
}
