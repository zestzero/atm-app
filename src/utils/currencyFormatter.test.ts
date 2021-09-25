import 'jest';
import { Currency } from 'types/currency';
import { currencyFormatter } from './currencyFormatter';

describe('currencyFormatter', () => {
    it('should return correct format', () => {
        const result = currencyFormatter(100, Currency.EUR);
        expect(result).toEqual('£100');
    });
});
