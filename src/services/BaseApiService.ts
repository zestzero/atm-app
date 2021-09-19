import unfetch from 'isomorphic-unfetch';
import fetch from 'isomorphic-unfetch';
import { Response } from '../types/response';

export abstract class BaseApiService {
    private API_URL = process.env.REACT_APP_API_URL;
    private path = '';

    constructor(path: string) {
        this.path = path;
    }

    protected async post<T>(body?: unfetch.IsomorphicBody): Promise<Response<T>> {
        try {
            const response = await fetch(`${this.API_URL}/${this.path}`, {
                body: JSON.stringify(body),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            return { isSuccess: response.ok, data: result as T };
        } catch (ex) {
            console.error(ex);
        }
        return Promise.reject();
    }
}
