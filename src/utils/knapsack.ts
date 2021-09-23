export interface KnapsackItemBase {
    weight: number;
    value: number;
}
export interface Knapsack<T> {
    items: T[];
    weight: number;
    value: number;
}

/**
 * A function using dynamic programming to calculate and return the items which provide the most value
 * and could be fitted within a given capacity.
 * @param items List of items
 * @param cap Maximum capacity of to put item
 * @param itemIndex Index of item
 * @returns Return Knapsack type { items: Item[], value: number }
 */
export const knapSack = <T extends KnapsackItemBase>(items: T[], cap: number, itemIndex: number): Knapsack<T> => {
    if (cap === 0 || itemIndex < 0) {
        const sack: Knapsack<T> = {
            items: [],
            value: 0,
            weight: 0,
        };
        return sack;
    }

    if (itemIndex > -1 && items[itemIndex].value > cap) {
        return knapSack(items, cap, itemIndex - 1);
    }

    const sackWithItem = knapSack(items, cap - items[itemIndex].value, itemIndex - 1);

    const sackWithoutItem = knapSack(items, cap, itemIndex - 1);

    const weightWithItem = sackWithItem.weight + items[itemIndex].weight;
    const weightWithoutItem = sackWithoutItem.weight;

    if (weightWithItem > weightWithoutItem) {
        const sack: Knapsack<T> = {
            items: sackWithItem.items.concat(items[itemIndex]),
            value: sackWithItem.value + items[itemIndex].value,
            weight: weightWithItem,
        };
        return sack;
    } else {
        return sackWithoutItem;
    }
};
