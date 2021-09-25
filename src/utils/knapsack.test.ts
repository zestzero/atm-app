import { Item } from 'types/dispenser';
import { knapSack } from './knapsack';
import { generateItem } from './mockUtils';

describe('knapSack', () => {
    const testCases = [
        { expected: 20, items: [generateItem(20, 5)] },
        {
            expected: 75,
            items: [
                generateItem(20, 3),
                generateItem(20, 4),
                generateItem(20, 5),
                generateItem(10, 1),
                generateItem(5, 1),
            ],
        },
    ];

    testCases.forEach((tc) =>
        it(`should return correct result if cap is ${tc.expected}`, () => {
            const items: Item[] = [
                generateItem(20, 1),
                generateItem(20, 2),
                generateItem(20, 3),
                generateItem(20, 4),
                generateItem(20, 5),
                generateItem(10, 1),
                generateItem(5, 1),
            ];
            const result = knapSack(items, tc.expected, items.length - 1);
            expect(result.value).toEqual(tc.expected);
            expect(result.items).toEqual(tc.items);
        }),
    );

    it(`should return max result if cap exceed`, () => {
        const items: Item[] = [generateItem(20, 1), generateItem(10, 1), generateItem(5, 1)];
        const result = knapSack(items, 35, items.length - 1);
        expect(result.value).toEqual(35);
        expect(result.items).toEqual(items);
    });
});
