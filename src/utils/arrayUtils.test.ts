import 'jest';
import { removeItemsWhenMatched } from './arrayUtils';

describe('arrayUtils', () => {
    describe('removeItemsWhenMatched', () => {
        it('should remove matched items correctly', () => {
            const items = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }, { id: 4 }];
            const removedItems = [{ id: 2 }, { id: 3 }];
            const comparer = (item1: { id: number }) => (item2: { id: number }) => item1.id === item2.id;
            const result = removeItemsWhenMatched(items, removedItems, comparer);

            expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 4 }]);
        });

        it('should not remove if there is no matched items', () => {
            const items = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }, { id: 4 }];
            const removedItems = [{ id: 5 }, { id: 6 }];
            const comparer = (item1: { id: number }) => (item2: { id: number }) => item1.id === item2.id;
            const result = removeItemsWhenMatched(items, removedItems, comparer);

            expect(result).toEqual(items);
        });
    });
});
