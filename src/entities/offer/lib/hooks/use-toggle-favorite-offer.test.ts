import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToggleFavoriteOffer } from './use-toggle-favorite-offer';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { UserAuthData, useUserAuthData } from '@/entities/user';
import { useNavigate } from 'react-router-dom';
import { toggleFavoriteOffer } from '../../api/toggle-favorite-offer';
import { getRouteLoginPage } from '@/shared/consts/router';

const mockedUser: UserAuthData = {
    email: 'test@test.com',
    token: 'test-token',
    name: 'test',
    isPro: false,
    avatarUrl: 'test',
};

vi.mock('@/shared/hooks/use-app-dispatch');
vi.mock('@/entities/user');
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));
vi.mock('../../api/toggle-favorite-offer');
vi.mock('@/shared/consts/router');

describe('useToggleFavoriteOffer', () => {
    const mockDispatch = vi.fn();
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    });

    describe('when user is authenticated', () => {
        beforeEach(() => {
            vi.mocked(useUserAuthData).mockReturnValue(mockedUser);
        });

        it('should dispatch toggleFavoriteOffer with status 1 when isFavorite is false', () => {
            const offerId = 'offer-123';
            const { result } = renderHook(() =>
                useToggleFavoriteOffer(offerId, false),
            );
            result.current();
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenCalledWith(
                toggleFavoriteOffer({
                    id: offerId,
                    status: 1,
                }),
            );
            expect(mockNavigate).not.toHaveBeenCalled();
        });

        it('should dispatch toggleFavoriteOffer with status 0 when isFavorite is true', () => {
            const offerId = 'offer-456';
            const { result } = renderHook(() =>
                useToggleFavoriteOffer(offerId, true),
            );
            result.current();
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenCalledWith(
                toggleFavoriteOffer({
                    id: offerId,
                    status: 0,
                }),
            );
            expect(mockNavigate).not.toHaveBeenCalled();
        });

        it('should toggle favorite multiple times correctly', () => {
            const offerId = 'offer-789';
            const { result } = renderHook(() =>
                useToggleFavoriteOffer(offerId, false),
            );
            result.current();
            expect(mockDispatch).toHaveBeenCalledWith(
                toggleFavoriteOffer({
                    id: offerId,
                    status: 1,
                }),
            );
            result.current();
            expect(mockDispatch).toHaveBeenCalledTimes(2);
        });
    });

    describe('when user is not authenticated', () => {
        beforeEach(() => {
            vi.mocked(useUserAuthData).mockReturnValue(undefined);
        });

        it('should navigate to login page when user is not authenticated', () => {
            const offerId = 'offer-123';
            const { result } = renderHook(() =>
                useToggleFavoriteOffer(offerId, false),
            );

            result.current();

            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith(getRouteLoginPage());
            expect(mockDispatch).not.toHaveBeenCalled();
        });

        it('should navigate to login page regardless of isFavorite value', () => {
            const offerId = 'offer-456';
            const { result: result1 } = renderHook(() =>
                useToggleFavoriteOffer(offerId, true),
            );
            result1.current();

            expect(mockNavigate).toHaveBeenCalledWith(getRouteLoginPage());

            vi.clearAllMocks();
            const { result: result2 } = renderHook(() =>
                useToggleFavoriteOffer(offerId, false),
            );
            result2.current();
            expect(mockNavigate).toHaveBeenCalledWith(getRouteLoginPage());
            expect(mockDispatch).not.toHaveBeenCalled();
        });
    });

    describe('useCallback dependencies', () => {
        it('should return the same callback when dependencies do not change', () => {
            vi.mocked(useUserAuthData).mockReturnValue(mockedUser);
            const offerId = 'offer-123';
            const { result, rerender } = renderHook(() =>
                useToggleFavoriteOffer(offerId, false),
            );
            const firstCallback = result.current;
            rerender();
            const secondCallback = result.current;
            expect(firstCallback).toBe(secondCallback);
        });

        it('should return new callback when isFavorite changes', () => {
            vi.mocked(useUserAuthData).mockReturnValue(mockedUser);
            const offerId = 'offer-123';
            const { result, rerender } = renderHook(
                ({ isFav }) => useToggleFavoriteOffer(offerId, isFav),
                { initialProps: { isFav: false } },
            );
            const firstCallback = result.current;
            rerender({ isFav: true });
            const secondCallback = result.current;
            expect(firstCallback).not.toBe(secondCallback);
        });

        it('should return new callback when id changes', () => {
            vi.mocked(useUserAuthData).mockReturnValue(mockedUser);
            const { result, rerender } = renderHook(
                ({ offerId }) => useToggleFavoriteOffer(offerId, false),
                { initialProps: { offerId: 'offer-123' } },
            );
            const firstCallback = result.current;
            rerender({ offerId: 'offer-456' });
            const secondCallback = result.current;
            expect(firstCallback).not.toBe(secondCallback);
        });

        it('should return new callback when authData changes', () => {
            vi.mocked(useUserAuthData).mockReturnValue(mockedUser);
            const offerId = 'offer-123';
            const { result, rerender } = renderHook(() =>
                useToggleFavoriteOffer(offerId, false),
            );
            const firstCallback = result.current;
            vi.mocked(useUserAuthData).mockReturnValue(undefined);
            rerender();
            const secondCallback = result.current;
            expect(firstCallback).not.toBe(secondCallback);
        });
    });

    describe('edge cases', () => {
        it('should handle empty string id', () => {
            vi.mocked(useUserAuthData).mockReturnValue(mockedUser);
            const { result } = renderHook(() =>
                useToggleFavoriteOffer('', false),
            );
            result.current();
            expect(mockDispatch).toHaveBeenCalledWith(
                toggleFavoriteOffer({
                    id: '',
                    status: 1,
                }),
            );
        });
    });
});
