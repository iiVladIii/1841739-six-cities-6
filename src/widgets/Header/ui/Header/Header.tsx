import { memo, useCallback } from 'react';
import { logout, useUserAuthData } from '@/entities/User';
import { Link, useLocation } from 'react-router-dom';
import {
    getRouteFavoritesPage,
    getRouteLoginPage,
    getRouteMainPage,
} from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export const Header = memo(() => {
    const dipatch = useAppDispatch();
    const authData = useUserAuthData();
    const location = useLocation();

    const logoutHandler = useCallback(() => {
        dipatch(logout());
    }, [dipatch]);

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Link
                            to={getRouteMainPage()}
                            className="header__logo-link header__logo-link--active"
                        >
                            <img
                                className="header__logo"
                                src="img/logo.svg"
                                alt="6 cities logo"
                                width="81"
                                height="41"
                            />
                        </Link>
                    </div>
                    {authData && (
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <Link
                                        className="header__nav-link header__nav-link--profile"
                                        to={getRouteFavoritesPage()}
                                    >
                                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                                        <span className="header__user-name user__name">
                                            {authData.email}
                                        </span>
                                        <span className="header__favorite-count">
                                            3
                                        </span>
                                    </Link>
                                </li>
                                <li className="header__nav-item">
                                    <button
                                        style={{
                                            border: 'none',
                                            padding: 0,
                                            background: 'transparent',
                                        }}
                                        className="header__nav-link"
                                        onClick={logoutHandler}
                                    >
                                        <span className="header__signout">
                                            Sign out
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                    {!authData && location.pathname !== getRouteLoginPage() && (
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item">
                                    <Link
                                        to={getRouteLoginPage()}
                                        className="header__nav-link"
                                    >
                                        <span className="header__signout">
                                            Sign in
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
});
