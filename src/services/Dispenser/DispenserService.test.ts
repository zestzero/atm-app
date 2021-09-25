import 'jest';
import CustomerNotSufficientAmountError from 'types/Error/CustomerNotSufficientAmountError';
import MachineNotSufficientAmountError from 'types/Error/MachineNotSufficientAmountError';
import OutOfServiceError from 'types/Error/OutOfServiceError';
import { generateItem } from 'utils/mockUtils';
import DispenserConfigurationBuilder from './DispenserConfigurationBuilder';
import DispenserService from './DispenserService';

describe('DispenserService', () => {
    // Total in ATM storage = 310
    const dispenserConfig = new DispenserConfigurationBuilder().withNotes(20, 7).withNotes(10, 15).withNotes(5, 4);
    const service = new DispenserService(dispenserConfig);
    describe('withdraw', () => {
        it('should return correct result if suffient amount', () => {
            const { result: firstWithdraw } = service.withdraw(140, 500);
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

            const { result: secondWithdraw } = service.withdraw(140, 360);
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

        it('should return MachineNotSufficientAmount error if insuffient amount', () => {
            const { error } = service.withdraw(999, 1000);
            expect(error).toBeInstanceOf(MachineNotSufficientAmountError);
        });

        it('should return OutOfService error if machine does not contain any money', () => {
            const service = new DispenserService(new DispenserConfigurationBuilder());
            const { error } = service.withdraw(100, 1000);
            expect(error).toBeInstanceOf(OutOfServiceError);
        });

        it('should return error if user does not have enough money', () => {
            const dispenserConfig = new DispenserConfigurationBuilder().withNotes(20, 10);
            const service = new DispenserService(dispenserConfig);
            const { error } = service.withdraw(130, 20);
            expect(error).toBeInstanceOf(CustomerNotSufficientAmountError);
        });
    });

    describe('shouldOverdrawn', () => {
        it.each`
            withdrawAmount | currentBalance | overdrawnAmount | expected
            ${100}         | ${20}          | ${100}          | ${true}
            ${100}         | ${0}           | ${100}          | ${true}
            ${100}         | ${0}           | ${50}           | ${false}
            ${100}         | ${100}         | ${50}           | ${false}
        `(
            'should return $expected when withdrawAmount: $withdrawAmount, currentBalance: $currentBalance, overdrawAmount: $overdrawnAmount',
            ({ withdrawAmount, currentBalance, overdrawnAmount, expected }) => {
                const result = service.shouldOverdrawn(withdrawAmount, currentBalance, overdrawnAmount);
                expect(result).toEqual(expected);
            },
        );
    });

    describe('getOverdrawnRemaining', () => {
        it.each`
            withdrawAmount | currentBalance | overdrawnAmount | expected
            ${100}         | ${20}          | ${100}          | ${20}
            ${20}          | ${20}          | ${100}          | ${100}
        `(
            'should return $expected when withdrawAmount: $withdrawAmount, currentBalance: $currentBalance, overdrawAmount: $overdrawnAmount',
            ({ withdrawAmount, currentBalance, overdrawnAmount, expected }) => {
                const result = service.getOverdrawnRemaining(withdrawAmount, currentBalance, overdrawnAmount);
                expect(result).toEqual(expected);
            },
        );
    });
});
