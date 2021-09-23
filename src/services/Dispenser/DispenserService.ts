import { Item, ResultWithError } from 'types/dispenser';
import CustomerNotSufficientAmountError from 'types/Error/CustomerNotSufficientAmountError';
import NotSufficientAmount from 'types/Error/MachineNotSufficientAmountError';
import OutOfService from 'types/Error/OutOfServiceError';
import { removeItemsWhenMatched } from 'utils/arrayUtils';
import { Knapsack, knapSack } from 'utils/knapsack';
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
        if (userCreditRemaining < amount) return { error: new CustomerNotSufficientAmountError() };
        if (this.remainingAmount === 0) return { error: new OutOfService() };
        if (this.remainingAmount < amount) return { error: new NotSufficientAmount() };

        const result = knapSack(this.remainingNotes, amount, this.remainingNotes.length - 1);
        this.remainingNotes = removeItemsWhenMatched(this.remainingNotes, result.items, compareFunc);
        this.remainingAmount = this.remainingAmount - result.value;
        return { result };
    };

    public getRemainingAmount = (): number => this.remainingAmount;
}

export default DispenserService;
