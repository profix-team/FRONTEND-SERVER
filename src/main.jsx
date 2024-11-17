import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './index.css';

async function prepare() {
    if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('./mocks/browser');
        return worker.start({
            onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 그대로 통과
        });
    }
    return Promise.resolve();
}

prepare().then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </React.StrictMode>
    );
});
