import 'jest';
import { NotSuffientAmount } from '../../types/Error/NotSuffientAmountError';
import { DispenserConfigurationBuilder } from './DispenserConfigurationBuilder';
import { DispenserService } from './DispenserService';

describe('DispenserService', () => {
    describe('withdraw', () => {
        const dispenserConfig = new DispenserConfigurationBuilder().withNotes(20, 7).withNotes(10, 15).withNotes(5, 4);
        it('should return correct result if suffient amount', () => {
            const service = new DispenserService(dispenserConfig);
            const { result: firstWithdraw } = service.withdraw(140);
            expect(firstWithdraw?.value).toEqual(140);
            expect(firstWithdraw?.items).toEqual([
                { name: '20', value: 20 },
                { name: '20', value: 20 },
                { name: '20', value: 20 },
                { name: '20', value: 20 },
                { name: '20', value: 20 },
                { name: '20', value: 20 },
                { name: '20', value: 20 },
            ]);
            expect(service.getRemainingAmount()).toEqual(170);

            const { result: secondWithdraw } = service.withdraw(140);
            expect(secondWithdraw?.value).toEqual(140);
            expect(secondWithdraw?.items).toEqual([
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
                { name: '10', value: 10 },
            ]);
            expect(service.getRemainingAmount()).toEqual(30);
        });

        it('should return error if insuffient amount', () => {
            const service = new DispenserService(dispenserConfig);
            const { error } = service.withdraw(999);
            expect(error).toBeInstanceOf(NotSuffientAmount);
        });
    });
});
