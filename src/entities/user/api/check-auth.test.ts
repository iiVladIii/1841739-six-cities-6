import { describe, it, expect, beforeEach, vi } from 'vitest';
import { checkAuth } from './check-auth';
import * as authCookie from '@/shared/api/auth-cookie';
import { AxiosInstance } from 'axios';

vi.mock('@/shared/api/auth-cookie');

describe('checkAuth thunk', () => {
    let dispatch: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        dispatch = vi.fn();
        vi.clearAllMocks();
    });

    it('should check auth successfully when token exists', async () => {
        const mockUserData = {
            email: 'test@test.com',
            token: 'refresh-token',
        };
        vi.mocked(authCookie.getAccessToken).mockReturnValue('existing-token');

        const mockApi = {
            get: vi.fn().mockResolvedValue({ data: mockUserData }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };
        const getState = vi.fn();

        const action = checkAuth();
        const result = await action(dispatch, getState, extra);

        expect(authCookie.getAccessToken).toHaveBeenCalled();
        expect(extra.api.get).toHaveBeenCalledWith('/login');
        expect(result.type).toBe('user/check-auth/fulfilled');
        expect(result.payload).toEqual(mockUserData);
    });

    it('should reject when no access token', async () => {
        const mockApi = {
            get: vi.fn(),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };
        const getState = vi.fn();
        vi.mocked(authCookie.getAccessToken).mockReturnValue(undefined);

        const action = checkAuth();
        const result = await action(dispatch, getState, extra);

        expect(extra.api.get).not.toHaveBeenCalled();
        expect(result.type).toBe('user/check-auth/rejected');
    });

    it('should handle API error', async () => {
        vi.mocked(authCookie.getAccessToken).mockReturnValue('existing-token');
        const mockApi = {
            post: vi.fn().mockRejectedValue(new Error('API Error')),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };
        const getState = vi.fn();

        const action = checkAuth();
        const result = await action(dispatch, getState, extra);

        expect(result.type).toBe('user/check-auth/rejected');
    });

    it('should handle empty response data', async () => {
        vi.mocked(authCookie.getAccessToken).mockReturnValue('existing-token');
        const mockApi = {
            post: vi.fn().mockResolvedValue({ data: null }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };
        const getState = vi.fn();

        const action = checkAuth();
        const result = await action(dispatch, getState, extra);

        expect(result.type).toBe('user/check-auth/rejected');
    });
});
