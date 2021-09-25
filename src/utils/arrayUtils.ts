export const removeItemsWhenMatched = <T>(
    remainingItems: T[],
    removedItems: T[],
    comparerFunc: (item1: T) => (item2: T) => boolean,
): T[] => {
    const items: T[] = [...remainingItems];
    removedItems.forEach((removedItem) => {
        const index = items.findIndex(comparerFunc(removedItem));
        if (index > -1) items.splice(index, 1);
    });
    return items;
};
