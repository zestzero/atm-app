import { Currency } from 'types/currency';

export const currencyFormatter = (value: number, currency: Currency): string => `${currency}${value}`;
