import { memo } from 'react';
import { Header } from '@/widgets/Header';
import { LoginForm } from '@/features/login';

const LoginPage = memo(() => (
    <div className="page page--gray page--login">
        <Header />

        <main className="page__main page__main--login">
            <div className="page__login-container container">
                <LoginForm />
                <section className="locations locations--login locations--current">
                    <div className="locations__item">
                        <a className="locations__item-link" href="#">
                            <span>Amsterdam</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    </div>
));

export default LoginPage;
