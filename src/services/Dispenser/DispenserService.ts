import { Item, Knapsack, ResultWithError } from 'types/dispenser';
import CustomerNotSufficientAmountError from 'types/Error/CustomerNotSufficientAmountError';
import InvalidAmountError from 'types/Error/InvalidAmountError';
import MachineNotSufficientAmount from 'types/Error/MachineNotSufficientAmountError';
import OutOfService from 'types/Error/OutOfServiceError';
import { removeItemsWhenMatched } from 'utils/arrayUtils';
import { knapSack } from 'utils/knapsack';
import DispenserConfigurationBuilder from './DispenserConfigurationBuilder';

const compareFunc = (item1: Item) => (item2: Item) => item1.name === item2.name && item1.weight === item2.weight;
class DispenserService {
    private remainingNotes: Item[];
    private remainingAmount: number;

    constructor(configBuilder: DispenserConfigurationBuilder) {
        const { totalNotes, totalAmount } = configBuilder.build();
        this.remainingNotes = totalNotes;
        this.remainingAmount = totalAmount;
    }

    public withdraw = (amount: number, userCreditRemaining: number): ResultWithError<Knapsack<Item>> => {
        if (this.remainingAmount === 0) return { error: new OutOfService() };
        if (this.remainingAmount < amount) return { error: new MachineNotSufficientAmount() };
        if (amount === 0) return { error: new InvalidAmountError() };
        if (userCreditRemaining < amount) return { error: new CustomerNotSufficientAmountError() };

        const result = knapSack(this.remainingNotes, amount, this.remainingNotes.length - 1);
        this.remainingNotes = removeItemsWhenMatched(this.remainingNotes, result.items, compareFunc);
        this.remainingAmount = this.remainingAmount - result.value;
        return { result };
    };

    public getRemainingAmount = (): number => this.remainingAmount;
    public shouldOverdrawn = (withdrawAmount: number, currentBalance: number, overdrawnAmount: number): boolean =>
        currentBalance < withdrawAmount && withdrawAmount <= currentBalance + overdrawnAmount;
    public getOverdrawnRemaining = (withdrawAmount: number, currentBalance: number, overdrawnAmount: number): number =>
        overdrawnAmount + (currentBalance - withdrawAmount);
}

export default DispenserService;
