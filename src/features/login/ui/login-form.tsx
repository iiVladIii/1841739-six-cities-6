import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { login } from '@/entities/user/';
import { useAuthError } from '@/entities/user';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const error = useAuthError();

    useEffect(() => {
        if (error && error.details.length > 0) {
            // eslint-disable-next-line no-alert
            alert(error.details[0].messages.join(', '));
        }
    }, [error]);

    const changeHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData((p) => ({ ...p, [name]: value }));
        },
        [],
    );

    const submitHandler = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsLoading(true);
            await dispatch(login(formData));
            setIsLoading(false);
        },
        [dispatch, formData],
    );

    return (
        <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
                className="login__form form"
                action="#"
                method="post"
                onSubmit={submitHandler}
            >
                <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">E-mail</label>
                    <input
                        className="login__input form__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={changeHandler}
                    />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">Password</label>
                    <input
                        className="login__input form__input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={changeHandler}
                    />
                </div>
                <button
                    disabled={isLoading}
                    className="login__submit form__submit button"
                    type="submit"
                >
                    Sign in
                </button>
            </form>
        </section>
    );
};
