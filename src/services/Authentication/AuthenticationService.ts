import { AuthenticationRequest, AuthenticationResponse } from '../../types/authentication';
import { Response } from '../../types/response';
import { BaseApiService } from '../BaseApiService';

export class AuthenticationService extends BaseApiService {
    constructor() {
        super('api/pin');
    }

    public async request(request: AuthenticationRequest): Promise<Response<AuthenticationResponse>> {
        return super.post<AuthenticationResponse>(request);
    }
}
