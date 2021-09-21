export interface Item {
    name: string;
    value: number;
}

export interface ResultWithError<T> {
    result?: T;
    error?: Error;
}
