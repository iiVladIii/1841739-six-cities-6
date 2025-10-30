import { AppRouter } from './providers/router-provider';
import './styles/main.css';
import './styles/index.css';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/entities/user';

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
