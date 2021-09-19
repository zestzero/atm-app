import { Func } from './types';

export const throttle = (func: () => void, timeout = 500): Func => {
    let ready = true;
    return (...args: []): void => {
        if (!ready) {
            return;
        }

        ready = false;
        func(...args);
        setTimeout(() => {
            ready = true;
        }, timeout);
    };
};
