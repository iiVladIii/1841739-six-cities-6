import { AppRoutesProps } from '@/shared/types/router';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuthData } from '@/entities/User';
import { Suspense } from 'react';
import { Loader } from '@/shared/ui';
import { getRouteLoginPage, getRouteMainPage } from '@/shared/consts/router';

interface Props {
    route: AppRoutesProps;
}

export const AppRoute = (props: Props) => {
    const { route } = props;
    const location = useLocation();
    const authData = useUserAuthData();

    const element = (
        <Suspense fallback={<Loader isPage />}>{route.element}</Suspense>
    );

    if (route.guestOnly && !!authData) {
        return (
            <Navigate
                to={getRouteMainPage()}
                state={{ from: location }}
                replace
            />
        );
    }

    if (route.authOnly && !authData) {
        return (
            <Navigate
                to={getRouteLoginPage()}
                state={{ from: location }}
                replace
            />
        );
    }

    return element;
};
