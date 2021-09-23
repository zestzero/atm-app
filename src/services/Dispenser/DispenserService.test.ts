import 'jest';
import NotSuffientAmount from 'types/Error/NotSuffientAmountError';
import OutOfService from 'types/Error/OutOfServiceError';
import { generateItem } from 'utils/mockUtils';
import DispenserConfigurationBuilder from './DispenserConfigurationBuilder';
import DispenserService from './DispenserService';

describe('DispenserService', () => {
    describe('withdraw', () => {
        // Total in ATM storage = 310
        const dispenserConfig = new DispenserConfigurationBuilder().withNotes(20, 7).withNotes(10, 15).withNotes(5, 4);
        it('should return correct result if suffient amount', () => {
            const service = new DispenserService(dispenserConfig);
            const { result: firstWithdraw } = service.withdraw(140);
            expect(firstWithdraw?.value).toEqual(140);
            expect(firstWithdraw?.items).toEqual([
                generateItem(20, 7),
                generateItem(10, 5),
                generateItem(10, 6),
                generateItem(10, 7),
                generateItem(10, 8),
                generateItem(10, 9),
                generateItem(10, 10),
                generateItem(10, 11),
                generateItem(10, 12),
                generateItem(10, 13),
                generateItem(10, 14),
                generateItem(10, 15),
                generateItem(5, 3),
                generateItem(5, 4),
            ]);
            expect(service.getRemainingAmount()).toEqual(170);

            const { result: secondWithdraw } = service.withdraw(140);
            expect(secondWithdraw?.value).toEqual(140);
            expect(secondWithdraw?.items).toEqual([
                generateItem(20, 2),
                generateItem(20, 3),
                generateItem(20, 4),
                generateItem(20, 5),
                generateItem(20, 6),
                generateItem(10, 2),
                generateItem(10, 3),
                generateItem(10, 4),
                generateItem(5, 1),
                generateItem(5, 2),
            ]);
            expect(service.getRemainingAmount()).toEqual(30);
        });

        it('should return error if insuffient amount', () => {
            const service = new DispenserService(dispenserConfig);
            const { error } = service.withdraw(999);
            expect(error).toBeInstanceOf(NotSuffientAmount);
        });

        it('should return error if machine does not have money', () => {
            const service = new DispenserService(new DispenserConfigurationBuilder());
            const { error } = service.withdraw(100);
            expect(error).toBeInstanceOf(OutOfService);
        });
    });
});
