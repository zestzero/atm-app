export interface KnapsackItemBase {
    weight: number;
    value: number;
}

export interface Knapsack<T> {
    items: T[];
    weight: number;
    value: number;
}

export interface Item extends KnapsackItemBase {
    name: string;
}

export interface ResultWithError<T> {
    result?: T;
    error?: Error;
}
