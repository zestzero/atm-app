/* eslint-disable @typescript-eslint/no-explicit-any */

import unfetch from 'isomorphic-unfetch';
import fetch from 'isomorphic-unfetch';
import { Response } from '../types/response';

export abstract class BaseApiService {
    private API_URL = process.env.REACT_APP_API_URL;
    private headers = {
        'Content-Type': 'application/json',
    };
    private path = '';

    constructor(path: string) {
        this.path = path;
    }

    protected async post<T>(body?: unfetch.IsomorphicBody): Promise<Response<T>> {
        try {
            const response = await fetch(`${this.API_URL}/${this.path}`, {
                headers: this.headers,
                method: 'POST',
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.ok) {
                return {
                    status: response.status,
                    data,
                };
            }
            throw new Error(response.statusText);
        } catch (err: any) {
            return Promise.reject(err ? err.message : '');
        }
    }
}
