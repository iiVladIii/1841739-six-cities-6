import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userReducer } from './slice';
import { UserSchema } from './types/state';
import { login } from '../api/login';
import { checkAuth } from '../api/check-auth';
import { logout } from '../api/logout';
import { setAccessToken, removeAccessToken } from '@/shared/api/auth-cookie';

vi.mock('@/shared/api/auth-cookie', () => ({
    setAccessToken: vi.fn(),
    removeAccessToken: vi.fn(),
    getAccessToken: vi.fn(),
}));

const mockUser = {
    isPro: false,
    avatarUrl: '',
    email: 'test@test.com',
    token: 'token',
    name: 'test',
};
describe('userSlice', () => {
    let initialState: UserSchema;

    beforeEach(() => {
        initialState = {};
        vi.clearAllMocks();
    });

    describe('login actions', () => {
        it('should handle login.pending', () => {
            const state: UserSchema = {
                authError: {
                    errorType: 'UNEXPECTED_ERROR',
                    message: 'msh',
                    details: [],
                },
            };
            const action = { type: login.pending.type };

            const newState = userReducer(state, action);

            expect(newState.authError).toBeUndefined();
        });

        it('should handle login.fulfilled', () => {
            const payload = {
                id: '1',
                email: 'test@test.com',
                token: 'test-token',
            };
            const action = { type: login.fulfilled.type, payload };

            const newState = userReducer(initialState, action);

            expect(newState.user).toEqual(payload);
            expect(setAccessToken).toHaveBeenCalledWith('test-token');
        });

        it('should handle login.rejected', () => {
            const error = { message: 'Login failed', statusCode: 401 };
            const action = { type: login.rejected.type, payload: error };

            const newState = userReducer(initialState, action);

            expect(newState.authError).toEqual(error);
        });
    });

    describe('checkAuth actions', () => {
        it('should handle checkAuth.fulfilled', () => {
            const payload = {
                id: '1',
                email: 'test@test.com',
                token: 'auth-token',
            };
            const action = { type: checkAuth.fulfilled.type, payload };

            const newState = userReducer(initialState, action);

            expect(newState.user).toEqual(payload);
            expect(setAccessToken).toHaveBeenCalledWith('auth-token');
        });

        it('should handle checkAuth.rejected', () => {
            const action = { type: checkAuth.rejected.type };

            userReducer(initialState, action);

            expect(removeAccessToken).toHaveBeenCalled();
        });
    });

    describe('logout actions', () => {
        it('should handle logout.fulfilled', () => {
            const state: UserSchema = {
                user: mockUser,
            };
            const action = { type: logout.fulfilled.type };

            const newState = userReducer(state, action);

            expect(newState.user).toBeUndefined();
            expect(removeAccessToken).toHaveBeenCalled();
        });

        it('should handle logout.rejected', () => {
            const state: UserSchema = {
                user: mockUser,
            };
            const action = { type: logout.rejected.type };

            const newState = userReducer(state, action);

            expect(newState.user).toBeUndefined();
            expect(removeAccessToken).toHaveBeenCalled();
        });
    });
});
