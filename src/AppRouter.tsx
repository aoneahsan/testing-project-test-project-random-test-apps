import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import Register from '@/pages/auth/Register';
import Home from './pages/Home';
import { APP_ROUTES } from './utils/constants';
import Login from './pages/auth/Login';
import UserFeed from './pages/UserFeed';
import AuthenticationHOC from './HOC/AuthenticationHOC';

export const appRouter = createBrowserRouter([
	{
		element: (
			<AuthenticationHOC isAuthenticatedView>
				<Home />
			</AuthenticationHOC>
		),
		path: APP_ROUTES.home,
		errorElement: <ErrorBoundary />,
	},
	{
		element: (
			<AuthenticationHOC isAuthenticatedView={false}>
				<Register />
			</AuthenticationHOC>
		),
		path: APP_ROUTES.register,
		errorElement: <ErrorBoundary />,
	},
	{
		element: (
			<AuthenticationHOC isAuthenticatedView={false}>
				<Login />
			</AuthenticationHOC>
		),
		path: APP_ROUTES.login,
		errorElement: <ErrorBoundary />,
	},
	{
		element: (
			<AuthenticationHOC isAuthenticatedView>
				<UserFeed />
			</AuthenticationHOC>
		),
		path: APP_ROUTES.userFeed,
		errorElement: <ErrorBoundary />,
	},
]);
