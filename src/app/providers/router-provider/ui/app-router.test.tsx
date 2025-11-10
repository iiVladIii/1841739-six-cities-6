import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppRouter } from './app-router';
import * as userHooks from '@/entities/user';

vi.mock('@/pages/main-page', () => ({
    MainPage: () => <div>Main Page</div>,
}));

vi.mock('@/pages/login-page', () => ({
    LoginPage: () => <div>Login Page</div>,
}));

vi.mock('@/pages/offer-page', () => ({
    OfferPage: () => <div>Offer Page</div>,
}));

vi.mock('@/pages/favorites-page', () => ({
    FavoritesPage: () => <div>Favorites Page</div>,
}));

vi.mock('@/pages/not-found-page', () => ({
    NotFoundPage: () => <div>Not Found Page</div>,
}));
vi.mock('@/entities/user', () => ({
    useUserAuthData: vi.fn(),
}));
vi.mock('@/shared/ui', () => ({
    Loader: () => <div>Loading...</div>,
}));

describe('AppRouter', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Public routes', () => {
        it('should render Main page on "/" route', async () => {
            vi.mocked(userHooks.useUserAuthData).mockReturnValue(undefined);

            render(
                <MemoryRouter initialEntries={['/']}>
                    <AppRouter />
                </MemoryRouter>,
            );

            expect(await screen.findByText('Main Page')).toBeInTheDocument();
        });

        it('should render Not Found page on unknown route', async () => {
            vi.mocked(userHooks.useUserAuthData).mockReturnValue(undefined);

            render(
                <MemoryRouter initialEntries={['/unknown-route']}>
                    <AppRouter />
                </MemoryRouter>,
            );

            expect(
                await screen.findByText('Not Found Page'),
            ).toBeInTheDocument();
        });

        it('should render Offer page with id parameter', async () => {
            vi.mocked(userHooks.useUserAuthData).mockReturnValue(undefined);

            render(
                <MemoryRouter initialEntries={['/offer/123']}>
                    <AppRouter />
                </MemoryRouter>,
            );

            expect(await screen.findByText('Offer Page')).toBeInTheDocument();
        });
        it('should render Not Found page on Offer page without id', async () => {
            vi.mocked(userHooks.useUserAuthData).mockReturnValue(undefined);

            render(
                <MemoryRouter initialEntries={['/offer']}>
                    <AppRouter />
                </MemoryRouter>,
            );

            expect(
                await screen.findByText('Not Found Page'),
            ).toBeInTheDocument();
        });
    });

    describe('Guest only routes (guestOnly)', () => {
        it('should render Login page when user is NOT authenticated', async () => {
            vi.mocked(userHooks.useUserAuthData).mockReturnValue(undefined);

            render(
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>,
            );

            expect(await screen.findByText('Login Page')).toBeInTheDocument();
        });

        it('should redirect to Main page when user IS authenticated', async () => {
            vi.mocked(userHooks.useUserAuthData).mockReturnValue({
                email: 'test@test.com',
                token: 'test-token',
                name: 'test',
                isPro: false,
                avatarUrl: 'test',
            });

            render(
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>,
            );

            expect(await screen.findByText('Main Page')).toBeInTheDocument();
            expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
        });
    });

    describe('Auth only routes (authOnly)', () => {
        it('should render Favorites page when user IS authenticated', async () => {
            vi.mocked(userHooks.useUserAuthData).mockReturnValue({
                email: 'test@test.com',
                token: 'test-token',
                name: 'test',
                isPro: false,
                avatarUrl: 'test',
            });

            render(
                <MemoryRouter initialEntries={['/favorites']}>
                    <AppRouter />
                </MemoryRouter>,
            );

            expect(
                await screen.findByText('Favorites Page'),
            ).toBeInTheDocument();
        });

        it('should redirect to Login page when user is NOT authenticated', async () => {
            vi.mocked(userHooks.useUserAuthData).mockReturnValue(undefined);

            render(
                <MemoryRouter initialEntries={['/favorites']}>
                    <AppRouter />
                </MemoryRouter>,
            );

            expect(await screen.findByText('Login Page')).toBeInTheDocument();
            expect(
                screen.queryByText('Favorites Page'),
            ).not.toBeInTheDocument();
        });
    });
});
