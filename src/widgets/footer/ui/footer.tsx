import { memo } from 'react';

interface HeaderProps {
    className?: string;
}

export const Footer = memo((props: HeaderProps) => {
    const { className: _className } = props;

    return (
        <footer className="footer container">
            <a className="footer__logo-link" href="main.html">
                <img
                    className="footer__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="64"
                    height="33"
                />
            </a>
        </footer>
    );
});
