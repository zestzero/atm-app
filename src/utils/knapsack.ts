export interface Item {
    name: string;
    value: number;
}

export interface Knapsack {
    items: Item[];
    value: number;
}

export const knapSack = (items: Item[], cap: number, itemIndex: number): Knapsack => {
    if (cap === 0 || itemIndex < 0) {
        const sack: Knapsack = {
            items: [],
            value: 0,
        };
        return sack;
    }

    if (itemIndex > -1 && items[itemIndex].value > cap) {
        return knapSack(items, cap, itemIndex - 1);
    }

    const sackWithItem = knapSack(items, cap - items[itemIndex].value, itemIndex - 1);

    const sackWithoutItem = knapSack(items, cap, itemIndex - 1);

    const valueWithItem = sackWithItem.value + items[itemIndex].value;
    const valueWithoutItem = sackWithoutItem.value;

    if (valueWithItem > valueWithoutItem) {
        const sack: Knapsack = {
            items: sackWithItem.items.concat(items[itemIndex]),
            value: valueWithItem,
        };
        return sack;
    } else {
        return sackWithoutItem;
    }
};
