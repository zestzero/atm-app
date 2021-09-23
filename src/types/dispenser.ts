import { KnapsackItemBase } from 'utils/knapsack';

export interface Item extends KnapsackItemBase {
    name: string;
}

export interface ResultWithError<T> {
    result?: T;
    error?: Error;
}
