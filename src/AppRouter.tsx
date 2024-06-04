import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import RegisterPage from '@/pages/auth/Register';

export const appRouter = createBrowserRouter([
	{
		element: <Home />,
		path: '/',
		errorElement: <ErrorBoundary />,
	},
	{
		element: <RegisterPage />,
		path: '/register',
		errorElement: <ErrorBoundary />,
	},
]);
