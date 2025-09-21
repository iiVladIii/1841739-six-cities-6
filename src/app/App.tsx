import { memo, Suspense } from 'react';
import './styles/main.css';
import { MainPage } from '@/pages/MainPage';
// import { FavoritesPage } from '@/pages/FavoritesPage';
// import { LoginPage } from '@/pages/LoginPage';
// import { OfferPage } from '@/pages/OfferPage';

interface AppProps {
    className?: string;
}

export const App = memo((props: AppProps) => {
    const { className } = props;

    return (
        <div className={className}>
            <Suspense fallback={'loading chunk'}>
                <MainPage />
                {/*<LoginPage />*/}
                {/*<FavoritesPage />*/}
                {/*<OfferPage />*/}
            </Suspense>
        </div>
    );
});
