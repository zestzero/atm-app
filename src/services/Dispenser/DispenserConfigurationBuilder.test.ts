import 'jest';
import { DispenserConfigurationBuilder } from './DispenserConfigurationBuilder';

describe('DispenserConfigurationBuilder', () => {
    it('should return configuration correctly', () => {
        const config = new DispenserConfigurationBuilder().withNotes(20, 3).withNotes(10, 1).build();
        expect(config.totalNotes).toEqual([
            { name: '20', value: 20 },
            { name: '20', value: 20 },
            { name: '20', value: 20 },
            { name: '10', value: 10 },
        ]);
    });
});
