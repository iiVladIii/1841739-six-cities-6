import { memo } from 'react';
import { Link } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router';

export const Footer = memo(() => (
    <footer className="footer container">
        <Link className="footer__logo-link" to={getRouteMainPage()}>
            <img
                className="footer__logo"
                src={`${__BASE__}img/logo.svg`}
                alt="6 cities logo"
                width="64"
                height="33"
            />
        </Link>
    </footer>
));
