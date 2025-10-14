export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    OFFER = 'offer',
    FAVORITES = 'favorites',
    NOT_FOUND = 'not-found',
}

export const getRouteMainPage = () => `/`;
export const getRouteLoginPage = () => `/login`;
export const getRouteFavoritesPage = () => `/favorites`;
export const getRouteOfferPage = (id: string | number = ':id') =>
    `/offer/${id}`;
