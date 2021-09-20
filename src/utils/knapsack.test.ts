import { Item, knapSack } from './knapsack';

describe('knapSack', () => {
    const generateItem = (val: number) => ({ name: `${val}`, value: val });
    const testCases = [
        { expected: 20, items: [generateItem(20)] },
        {
            expected: 75,
            items: [generateItem(20), generateItem(20), generateItem(20), generateItem(10), generateItem(5)],
        },
    ];

    testCases.forEach((tc) =>
        it(`should return correct result if cap is ${tc.expected}`, () => {
            const items: Item[] = [
                generateItem(20),
                generateItem(20),
                generateItem(20),
                generateItem(20),
                generateItem(20),
                generateItem(10),
                generateItem(5),
            ];
            const result = knapSack(items, tc.expected, items.length - 1);
            expect(result.value).toEqual(tc.expected);
            expect(result.items).toEqual(tc.items);
        }),
    );

    it(`should return max result if cap exceed`, () => {
        const items: Item[] = [generateItem(20), generateItem(10), generateItem(5)];
        const result = knapSack(items, 35, items.length - 1);
        expect(result.value).toEqual(35);
        expect(result.items).toEqual(items);
    });
});
