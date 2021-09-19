import { maskingString } from './stringUtils';

describe('stringUtils', () => {
    describe('maskingString', () => {
        it('should mask all string with *', () => {
            const result = maskingString('1234');
            expect(result).toEqual('****');
        });

        it('should return empty when no input', () => {
            const result = maskingString('');
            expect(result).toHaveLength(0);
        });
    });
});
