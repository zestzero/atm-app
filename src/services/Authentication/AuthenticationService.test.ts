import 'jest';
import fetch from 'isomorphic-unfetch';
import { mocked } from 'ts-jest/utils';
import { AuthenticationService } from './AuthenticationService';

jest.mock('isomorphic-unfetch');
const fetchMocked = mocked(fetch);

describe('AuthenticationService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return correctly when api return 200 status', async () => {
        process.env.REACT_APP_API_URL = 'http://new-api.com';
        const data = { currentBalance: '123' };
        const response = { status: 200, json: jest.fn().mockResolvedValueOnce(data) };
        fetchMocked.mockResolvedValueOnce(response as never);
        const service = new AuthenticationService();
        const result = await service.request({ pin: '1234' });
        expect(fetch).toBeCalledWith('http://new-api.com/api/pin', {
            method: 'POST',
            body: '{"pin":"1234"}',
            headers: {
                ['Content-Type']: 'application/json',
            },
        });
        expect(result.status).toEqual(200);
        expect(result.data.currentBalance).toEqual('123');
    });
});
