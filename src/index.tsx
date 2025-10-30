import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers/store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <StoreProvider>
        <BrowserRouter basename={__BASE__}>
            <App />
        </BrowserRouter>
    </StoreProvider>,
);
