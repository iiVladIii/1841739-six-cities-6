import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './header';
import { StoreDecorator } from '@/shared/config/storybook/store-decorator';
import { getRouteMainPage } from '@/shared/consts/router';

const meta: Meta<typeof Header> = {
    title: 'widgets/Header',
    component: Header,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Authenticated: Story = {
    decorators: [
        StoreDecorator({
            user: {
                user: {
                    email: 'test@example.com',
                    name: 'Test User',
                    avatarUrl: 'https://example.com/avatar.jpg',
                    isPro: false,
                    token: 'test-token',
                },
            },
            offer: {
                favoriteOffers: {},
                favoriteCount: 5,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: [getRouteMainPage()],
        },
    },
};

export const AuthenticatedWithManyFavorites: Story = {
    decorators: [
        StoreDecorator({
            user: {
                user: {
                    email: 'user@example.com',
                    name: 'John Doe',
                    avatarUrl: 'https://example.com/avatar.jpg',
                    isPro: true,
                    token: 'test-token',
                },
            },
            offer: {
                favoriteOffers: {},
                favoriteCount: 25,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: [getRouteMainPage()],
        },
    },
};

export const AuthenticatedNoFavorites: Story = {
    decorators: [
        StoreDecorator({
            user: {
                user: {
                    email: 'newuser@example.com',
                    name: 'New User',
                    avatarUrl: 'https://example.com/avatar.jpg',
                    isPro: false,
                    token: 'test-token',
                },
            },
            offer: {
                favoriteOffers: {},
                favoriteCount: 0,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: [getRouteMainPage()],
        },
    },
};

export const NotAuthenticated: Story = {
    decorators: [
        StoreDecorator({
            user: {
                user: undefined,
            },
            offer: {
                favoriteOffers: {},
                favoriteCount: 0,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: [getRouteMainPage()],
        },
    },
};
