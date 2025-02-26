import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import NewUsers from './pages/Users';
import { Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<NewUsers />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: '8px',
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 6000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-gray-0)',
              color: 'var(--color-gray-7000)',
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
