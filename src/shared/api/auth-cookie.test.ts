import { describe, it, expect, vi, beforeEach } from 'vitest';
import Cookies from 'js-cookie';
import {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
} from './auth-cookie';

vi.mock('js-cookie', () => ({
    default: {
        get: vi.fn(),
        set: vi.fn(),
        remove: vi.fn(),
    },
}));

describe('Access Token Cookie Utils', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAccessToken', () => {
        it('should call Cookies.get with correct key', () => {
            const mockToken = 'test-access-token-123';
            (Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(
                mockToken,
            );

            const result = getAccessToken();

            expect(Cookies.get).toHaveBeenCalledWith('accessToken');
            expect(result).toBe(mockToken);
        });

        it('should return undefined if token is not found', () => {
            (Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(
                undefined,
            );

            const result = getAccessToken();

            expect(Cookies.get).toHaveBeenCalledWith('accessToken');
            expect(result).toBeUndefined();
        });

        it('should be called exactly once', () => {
            (Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue('token');

            getAccessToken();

            expect(Cookies.get).toHaveBeenCalledTimes(1);
        });
    });

    describe('setAccessToken', () => {
        it('should call Cookies.set with correct parameters', () => {
            const testToken = 'new-access-token-456';

            setAccessToken(testToken);

            expect(Cookies.set).toHaveBeenCalledWith('accessToken', testToken);
            expect(Cookies.set).toHaveBeenCalledTimes(1);
        });

        it('should handle empty string correctly', () => {
            setAccessToken('');

            expect(Cookies.set).toHaveBeenCalledWith('accessToken', '');
        });

        it('should handle long token correctly', () => {
            const longToken = 'a'.repeat(1000);

            setAccessToken(longToken);

            expect(Cookies.set).toHaveBeenCalledWith('accessToken', longToken);
        });
    });

    describe('removeAccessToken', () => {
        it('should call Cookies.remove with correct key', () => {
            removeAccessToken();

            expect(Cookies.remove).toHaveBeenCalledWith('accessToken');
            expect(Cookies.remove).toHaveBeenCalledTimes(1);
        });

        it('should remove token even if it does not exist', () => {
            (Cookies.remove as ReturnType<typeof vi.fn>).mockReturnValue(
                undefined,
            );

            removeAccessToken();

            expect(Cookies.remove).toHaveBeenCalledWith('accessToken');
        });
    });

    describe('Integration scenarios', () => {
        it('should set and get token', () => {
            const token = 'integration-test-token';

            setAccessToken(token);
            (Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(token);

            const result = getAccessToken();

            expect(result).toBe(token);
        });

        it('should set and remove token', () => {
            const token = 'token-to-remove';

            setAccessToken(token);
            removeAccessToken();

            expect(Cookies.set).toHaveBeenCalledWith('accessToken', token);
            expect(Cookies.remove).toHaveBeenCalledWith('accessToken');
        });
    });
});
