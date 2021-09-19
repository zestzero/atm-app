import { Func } from './types';

export function debounce(func: Func, timeout: number): Func {
    let timer: NodeJS.Timeout;
    return (...args: []) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}
