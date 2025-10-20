import { AppRouter } from './providers/routerProvider';
import './styles/main.css';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useEffect } from 'react';
import { checkAuth } from '@/entities/User';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return <AppRouter />;
};
