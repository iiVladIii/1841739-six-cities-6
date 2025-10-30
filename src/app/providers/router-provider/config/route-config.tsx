import {
    AppRoutes,
    getRouteFavoritesPage,
    getRouteLoginPage,
    getRouteMainPage,
    getRouteOfferPage,
} from '@/shared/consts/router';
import { AppRoutesProps } from '@/shared/types/router';
import { MainPage } from '@/pages/main-page';
import { LoginPage } from '@/pages/login-page';
import { OfferPage } from '@/pages/offer-page';
import { FavoritesPage } from '@/pages/favorites-page';
import { NotFoundPage } from '@/pages/not-found-page';

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
