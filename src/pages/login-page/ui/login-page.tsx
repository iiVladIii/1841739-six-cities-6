import { memo } from 'react';
import { Header } from '@/widgets/header';
import { LoginForm } from '@/features/login';
import { Link } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router.ts';

const LoginPage = memo(() => (
    <div className="page page--gray page--login">
        <Header />

        <main className="page__main page__main--login">
            <div className="page__login-container container">
                <LoginForm />
                <section className="locations locations--login locations--current">
                    <div className="locations__item">
                        <Link
                            className="locations__item-link"
                            to={`${getRouteMainPage()}?city=Amsterdam`}
                        >
                            <span>Amsterdam</span>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    </div>
));

export default LoginPage;
