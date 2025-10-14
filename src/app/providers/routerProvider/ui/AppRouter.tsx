import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';
import { Suspense, useCallback } from 'react';
import { AppRoutesProps } from '@/shared/types/router';
import { Loader } from '@/shared/ui';
import { useUserAuthData } from '@/entities/User';
import { getRouteLoginPage, getRouteMainPage } from '@/shared/consts/router';

export const AppRouter = () => {
    const location = useLocation();
    const authData = useUserAuthData(true);

    const renderWithWrapper = useCallback(
        (route: AppRoutesProps) => {
            const element = (
                <Suspense fallback={<Loader isPage />}>
                    {route.element}
                </Suspense>
            );

            if (route.guestOnly && !!authData) {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Navigate
                                to={getRouteMainPage()}
                                state={{ from: location }}
                                replace
                            />
                        }
                    />
                );
            }

            if (route.authOnly && !authData) {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Navigate
                                to={getRouteLoginPage()}
                                state={{ from: location }}
                                replace
                            />
                        }
                    />
                );
            }

            return (
                <Route key={route.path} path={route.path} element={element} />
            );
        },
        [authData, location],
    );

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
