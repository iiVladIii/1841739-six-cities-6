import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router';
import cls from './NotFoundPage.module.css';

const NotFoundPage = memo(() => {
    const navigate = useNavigate();

    const goMainHandler = useCallback(() => {
        navigate(getRouteMainPage());
    }, [navigate]);

    const goBackHandler = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <main className={cls.container}>
            <div className={cls.content}>
                <h1 className={cls.errorCode}>404</h1>
                <h2 className={cls.title}>Страница не найдена</h2>
                <p className={cls.description}>
                    К сожалению, запрашиваемая страница не существует.
                </p>
                <button onClick={goBackHandler} className={cls.primaryButton}>
                    Назад
                </button>
                <button onClick={goMainHandler} className={cls.secondaryButton}>
                    На главную
                </button>
            </div>
            <div className={cls.decoration}>
                <div className={cls.decorationCircle1} />
                <div className={cls.decorationCircle2} />
            </div>
        </main>
    );
});

export default NotFoundPage;
