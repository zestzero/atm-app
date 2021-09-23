import { Item } from 'types/dispenser';

interface DispenserConfig {
    totalNotes: Item[];
    totalAmount: number;
}

export class DispenserConfigurationBuilder {
    private totalNotes: Item[] = [];
    private totalAmount = 0;

    public withNotes = (value: number, amount: number): DispenserConfigurationBuilder => {
        for (let counter = 0; counter < amount; counter++) {
            this.totalNotes.push({ name: `${value}`, value, weight: counter + 1 });
            this.totalAmount = this.totalAmount + value;
        }
        return this;
    };

    public build = (): DispenserConfig => ({ totalNotes: this.totalNotes, totalAmount: this.totalAmount });
}
