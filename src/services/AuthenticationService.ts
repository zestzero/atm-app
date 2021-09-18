import { AuthenticationRequest, AuthenticationResponse } from '../models/authentication';
import { BaseApiService } from './BaseApiService';

export class AuthenticationService extends BaseApiService {
    constructor() {
        super('api/pin');
    }

    public async request(request: AuthenticationRequest): Promise<AuthenticationResponse> {
        return super.post<AuthenticationResponse>(request);
    }
}
