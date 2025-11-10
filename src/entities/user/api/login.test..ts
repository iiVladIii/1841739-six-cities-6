import { describe, it, expect, beforeEach, vi } from 'vitest';
import { login } from './login';
import { AxiosInstance } from 'axios';

vi.mock('@/shared/api/auth-cookie');

describe('login thunk', () => {
    let dispatch: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        dispatch = vi.fn();
        vi.clearAllMocks();
    });

    it('should login successfully', async () => {
        const mockUserData = {
            email: 'test@test.com',
            token: 'access-token',
        };
        const mockApi = {
            post: vi.fn().mockResolvedValue({ data: mockUserData }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };
        const getState = vi.fn();

        const loginData = { email: 'test@test.com', password: 'password123' };
        const action = login(loginData);
        const result = await action(dispatch, getState, extra);

        expect(extra.api.post).toHaveBeenCalledWith('/login', loginData);
        expect(result.type).toBe('user/login/fulfilled');
        expect(result.payload).toEqual(mockUserData);
    });

    it('should handle login error', async () => {
        const error = new Error('Network error');
        const mockApi = {
            post: vi.fn().mockRejectedValue(error),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };

        const loginData = { email: 'test@test.com', password: 'wrong' };
        const action = login(loginData);
        const getState = vi.fn();
        const result = await action(dispatch, getState, extra);

        expect(result.type).toBe('user/login/rejected');
        expect(extra.errorHandler).toHaveBeenCalledWith(error);
        expect(result.payload).toEqual({
            message: 'Error occurred',
            statusCode: 500,
        });
    });

    it('should handle empty response data', async () => {
        const mockApi = {
            post: vi.fn().mockResolvedValue({ data: null }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };

        const loginData = { email: 'test@test.com', password: 'password123' };
        const action = login(loginData);
        const getState = vi.fn();

        const result = await action(dispatch, getState, extra);

        expect(result.type).toBe('user/login/rejected');
    });
});
