import 'jest';
import { generateItem } from 'utils/mockUtils';
import DispenserConfigurationBuilder from './DispenserConfigurationBuilder';

describe('DispenserConfigurationBuilder', () => {
    it('should return configuration correctly', () => {
        const config = new DispenserConfigurationBuilder().withNotes(20, 3).withNotes(10, 1).build();
        expect(config.totalNotes).toEqual([
            generateItem(20, 1),
            generateItem(20, 2),
            generateItem(20, 3),
            generateItem(10, 1),
        ]);
        expect(config.totalAmount).toEqual(70);
    });
});
