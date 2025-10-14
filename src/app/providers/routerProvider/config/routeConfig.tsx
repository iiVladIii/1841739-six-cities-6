import {
    AppRoutes,
    getRouteFavoritesPage,
    getRouteLoginPage,
    getRouteMainPage,
    getRouteOfferPage,
} from '@/shared/consts/router';
import { AppRoutesProps } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { LoginPage } from '@/pages/LoginPage';
import { OfferPage } from '@/pages/OfferPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMainPage(),
        element: <MainPage />,
    },

    [AppRoutes.LOGIN]: {
        path: getRouteLoginPage(),
        element: <LoginPage />,
        guestOnly: true,
    },

    [AppRoutes.OFFER]: {
        path: getRouteOfferPage(':id'),
        element: <OfferPage />,
    },

    [AppRoutes.FAVORITES]: {
        path: getRouteFavoritesPage(),
        element: <FavoritesPage />,
        authOnly: true,
    },

    [AppRoutes.NOT_FOUND]: {
        element: <NotFoundPage />,
        path: '*',
    },
};
