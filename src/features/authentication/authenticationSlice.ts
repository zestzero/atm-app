import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthenticationService } from '../../services/AuthenticationService';
import { AuthenticationRequest } from '../../types/authentication';
import { Authentication, AuthStatus } from './types';

const initialState: Authentication = {
    status: AuthStatus.None,
    currentBalance: 0,
};
const authService = new AuthenticationService();

export const authPin = createAsyncThunk('AUTH/AUTH_PIN', async (req: AuthenticationRequest) => {
    const response = await authService.request({ pin: req.pin });
    return response;
});

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        updateCurrentBalance: (state, action) => {
            state.currentBalance = action.payload;
        },
        updateAuthStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(authPin.pending, (state) => {
                state.status = AuthStatus.Pending;
            })
            .addCase(authPin.fulfilled, (state, action) => {
                if (action.payload.status === 403) {
                    state.status = AuthStatus.Failed;
                } else if (action.payload.status === 200) {
                    state.status = AuthStatus.Success;
                    state.currentBalance = action.payload.data.currentBalance;
                }
            })
            .addCase(authPin.rejected, (state) => {
                state.status = AuthStatus.Error;
            });
    },
});

export const { updateAuthStatus, updateCurrentBalance } = authenticationSlice.actions;
export default authenticationSlice.reducer;
