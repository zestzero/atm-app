import { Currency } from 'types/currency';

export const currencyFormatter = (value: number, currency: Currency): string =>
    `${value < 0 ? '-' : ''}${currency}${Math.abs(value)}`;
