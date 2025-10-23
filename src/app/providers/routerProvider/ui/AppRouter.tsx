import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';
import { AppRoute } from './app-route';
export const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map((route) => (
            <Route
                key={route.path}
                path={route.path}
                element={<AppRoute key={route.path} route={route} />}
            />
        ))}
    </Routes>
);
