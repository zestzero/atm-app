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
    return response.data;
});

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        // update
    },
    extraReducers(builder) {
        builder
            .addCase(authPin.pending, (state) => {
                state.status = AuthStatus.Pending;
            })
            .addCase(authPin.fulfilled, (state, action) => {
                state.status = AuthStatus.Success;
                state.currentBalance = action.payload.currentBalance;
            });
    },
});

// export const {  } = authenticationSlice.actions;
export default authenticationSlice.reducer;
