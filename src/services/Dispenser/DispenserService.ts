import { Item, ResultWithError } from '../../types/dispenser';
import { NotSuffientAmount } from '../../types/Error/NotSuffientAmountError';
import { removeItemsWhenMatched } from '../../utils/arrayUtils';
import { Knapsack, knapSack } from '../../utils/knapsack';
import { DispenserConfigurationBuilder } from './DispenserConfigurationBuilder';

const compareFunc = (item1: Item) => (item2: Item) => item1.name === item2.name;
export class DispenserService {
    private remainingNotes: Item[];
    private remainingAmount: number;

    constructor(configBuilder: DispenserConfigurationBuilder) {
        const { totalNotes, totalAmount } = configBuilder.build();
        this.remainingNotes = totalNotes;
        this.remainingAmount = totalAmount;
    }

    public isAvailable = (amount: number, userCreditRemaining: number): boolean => amount <= userCreditRemaining;

    public withdraw = (amount: number): ResultWithError<Knapsack<Item>> => {
        if (amount > this.remainingAmount) {
            return { error: new NotSuffientAmount() };
        }
        const result = knapSack(this.remainingNotes, amount, this.remainingNotes.length - 1);
        this.remainingNotes = removeItemsWhenMatched(this.remainingNotes, result.items, compareFunc);
        this.remainingAmount = this.remainingAmount - result.value;
        return { result };
    };

    public getRemainingAmount = (): number => this.remainingAmount;
}
