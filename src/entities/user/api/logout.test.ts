import { describe, it, expect, beforeEach, vi } from 'vitest';
import { logout } from './logout';
import { getAccessToken } from '@/shared/api/auth-cookie';
import { AxiosInstance } from 'axios';

vi.mock('@/shared/api/auth-cookie');

describe('logout thunk', () => {
    let dispatch: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        dispatch = vi.fn();
        vi.clearAllMocks();
    });

    it('should logout successfully when token exists', async () => {
        vi.mocked(getAccessToken).mockReturnValue('existing-token');
        const mockApi = {
            delete: vi.fn().mockResolvedValue({}),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };
        const getState = vi.fn();

        const action = logout();
        const result = await action(dispatch, getState, extra);

        expect(getAccessToken).toHaveBeenCalled();
        expect(extra.api.delete).toHaveBeenCalledWith('/login');
        expect(result.type).toBe('user/logout/fulfilled');
    });

    it('should reject when no access token', async () => {
        vi.mocked(getAccessToken).mockReturnValue(undefined);

        const action = logout();
        const mockApi = {
            delete: vi.fn().mockResolvedValue({}),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };
        const getState = vi.fn();

        const result = await action(dispatch, getState, extra);

        expect(extra.api.delete).not.toHaveBeenCalled();
        expect(result.type).toBe('user/logout/rejected');
    });

    it('should handle API error', async () => {
        vi.mocked(getAccessToken).mockReturnValue('existing-token');
        const mockApi = {
            delete: vi.fn().mockRejectedValue(new Error('API Error')),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };
        const getState = vi.fn();

        const action = logout();
        const result = await action(dispatch, getState, extra);

        expect(result.type).toBe('user/logout/rejected');
    });
});
