import { RouteProps } from 'react-router-dom';

export type AppRoutesAuthProps = RouteProps & {
    authOnly: true;
    guestOnly?: never;
};

export type AppRoutesPublicProps = RouteProps & {
    authOnly?: never;
    guestOnly?: never;
};

export type AppRoutesGuestProps = RouteProps & {
    authOnly?: never;
    guestOnly: true;
};

export type AppRoutesProps =
    | AppRoutesAuthProps
    | AppRoutesPublicProps
    | AppRoutesGuestProps;
