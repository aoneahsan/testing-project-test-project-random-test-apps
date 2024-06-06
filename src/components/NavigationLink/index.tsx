import { userIsAuthenticatedRStateSelector } from '@/state/userState';
import { APP_ROUTES } from '@/utils/constants';
import { Button } from '@radix-ui/themes';
import { matchRoutes, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMediaQuery } from 'react-responsive';

interface INavigationLinkProps {
	path: string;
	isAuthenticated: boolean;
	label: string;
}

const NavigationLink: React.FC<INavigationLinkProps> = ({
	isAuthenticated,
	label,
	path,
}) => {
	const location = useLocation();
	const userIsAuthenticatedRState = useRecoilValue(
		userIsAuthenticatedRStateSelector
	);
	const routesMatch = matchRoutes(
		[
			{ path: APP_ROUTES.home },
			{ path: APP_ROUTES.userFeed },
			{ path: APP_ROUTES.myAccount },
			{ path: APP_ROUTES.login },
			{ path: APP_ROUTES.register },
		],
		location
	);

	const isDesktop = useMediaQuery({
		minWidth: '901px',
	});
	const isMobile = useMediaQuery({
		maxWidth: '700px',
	});

	const currentActiveRoute = routesMatch && routesMatch[0].pathname;
	const isCurrentPathActive = currentActiveRoute === path;

	if (userIsAuthenticatedRState && !isAuthenticated) {
		return null;
	} else {
		return (
			<Button
				size={isDesktop ? '3' : '2'}
				mr='2'
				color={isCurrentPathActive ? 'teal' : undefined}
				asChild
				mb={isMobile ? '2' : '0'}
			>
				<Link to={path}>{label}</Link>
			</Button>
		);
	}
};
export default NavigationLink;
