import { Item } from 'types/dispenser';

export const generateItem = (value: number, weight: number): Item => ({ name: `${value}`, value, weight });
