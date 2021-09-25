export interface Authentication {
    status: AuthStatus;
    currentBalance: number;
    overdrawnAmount: number;
}

export enum AuthStatus {
    None = 'None',
    Pending = 'Pending',
    Success = 'Success',
    Failed = 'Failed',
    Error = 'Error',
}
