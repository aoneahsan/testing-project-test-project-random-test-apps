import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import Register from '@/pages/auth/Register';
import Home from './pages/Home';
import { APP_ROUTES } from './utils/constants';
import Login from './pages/auth/Login';
import UserFeed from './pages/UserFeed';
import NotFound from './pages/NotFound';
import MyAccount from './pages/MyAccount';
import MainAppLayout from './layout/MainAppLayout';
import RouteGuardHOC from './HOC/RouteGuardHOC';
import NewsDetail from './pages/NewsDetail';

export const appRouter = createBrowserRouter([
	{
		path: APP_ROUTES.rootRoute,
		element: <MainAppLayout />,
		errorElement: <ErrorBoundary />,
		children: [
			// UnAuthenticated Routes
			{
				element: (
					<RouteGuardHOC isAuthenticatedView={false}>
						<Register />
					</RouteGuardHOC>
				),
				path: APP_ROUTES.register,
				errorElement: <ErrorBoundary />,
			},
			{
				element: (
					<RouteGuardHOC isAuthenticatedView={false}>
						<Login />
					</RouteGuardHOC>
				),
				path: APP_ROUTES.login,
				errorElement: <ErrorBoundary />,
			},

			// Authenticated Routes
			{
				element: (
					<RouteGuardHOC isAuthenticatedView>
						<Home />
					</RouteGuardHOC>
				),
				path: APP_ROUTES.home,
				errorElement: <ErrorBoundary />,
			},
			{
				element: (
					<RouteGuardHOC isAuthenticatedView>
						<UserFeed />
					</RouteGuardHOC>
				),
				path: APP_ROUTES.userFeed,
				errorElement: <ErrorBoundary />,
			},
			{
				element: (
					<RouteGuardHOC isAuthenticatedView>
						<MyAccount />
					</RouteGuardHOC>
				),
				path: APP_ROUTES.myAccount,
				errorElement: <ErrorBoundary />,
			},
			{
				element: (
					<RouteGuardHOC isAuthenticatedView>
						<NewsDetail />
					</RouteGuardHOC>
				),
				path: APP_ROUTES.newsDetail,
				errorElement: <ErrorBoundary />,
			},
		],
	},
	{
		element: <NotFound />,
		path: APP_ROUTES.wildCard,
		errorElement: <ErrorBoundary />,
	},
]);
