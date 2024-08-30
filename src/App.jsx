import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Stocks from './pages/Stocks';
import Indices from './pages/Indices';
import Futures from './pages/Futures';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            //how long until cached data is refreshed
            staleTime: 60 * 1000,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="stocks" element={<Stocks />} />
                        <Route path="indices" element={<Indices />} />
                        <Route path="futures" element={<Futures />} />
                    </Route>
                    {/* <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} /> */}
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
