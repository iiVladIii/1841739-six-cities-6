import { AppRouter } from './providers/routerProvider';
import './styles/main.css';
import './styles/index.css';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/entities/User';

export const App = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        dispatch(checkAuth()).finally(() => setIsLoading(false));
    }, [dispatch]);

    if (isLoading) return null;
    return <AppRouter />;
};
