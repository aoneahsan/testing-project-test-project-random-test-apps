import { Box, Button, Flex } from '@radix-ui/themes';
import IMAGES from '@/assets/images';
import './styles.css';
import LogoutButton from '../LogoutButton';
import { matchRoutes, useLocation } from 'react-router';
import { APP_ROUTES } from '@/utils/constants';
import { useRecoilValue } from 'recoil';
import { userIsAuthenticatedRStateSelector } from '@/state/userState';
import { formatRoutesMatchResult } from '@/utils/helpers';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useMemo } from 'react';

const Header: React.FC = () => {
	const location = useLocation();
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
	const matchedRoutes = routesMatch?.map((item) => {
		return item.pathname;
	});
	const {
		isLoginRoute,
		isRegisterRoute,
		isHomeRoute,
		isMyAccountRoute,
		isUserFeedRoute,
	} = formatRoutesMatchResult(matchedRoutes);
	const userIsAuthenticatedRState = useRecoilValue(
		userIsAuthenticatedRStateSelector
	);
	const links = useMemo(() => {
		return [
			{
				path: APP_ROUTES.home,
				isAuthenticated: true,
				label: 'Search Articles',
			},
		];
	}, []);

	const isTablet = useMediaQuery({
		query: '(max-width: 900px)',
	});
	const isMobile = useMediaQuery({
		query: '(max-width: 700px)',
	});

	return (
		<>
			<Box className='header-con'>
				<Box
					className='header-content'
					py='3'
				>
					<Flex
						justify='between'
						align='center'
					>
						<img
							src={IMAGES.NewsPaperAppIcon}
							width={60}
						/>
						<Box>
							{userIsAuthenticatedRState ? (
								<>
									<Button
										size='3'
										mr='2'
										color={isHomeRoute ? 'teal' : undefined}
										asChild
									>
										<Link to={APP_ROUTES.home}>Search Articles</Link>
									</Button>
									<Button
										size='3'
										mr='2'
										color={isUserFeedRoute ? 'teal' : undefined}
										asChild
									>
										<Link to={APP_ROUTES.userFeed}>News Feed</Link>
									</Button>
									<Button
										size='3'
										mr='2'
										color={isMyAccountRoute ? 'teal' : undefined}
										asChild
									>
										<Link to={APP_ROUTES.myAccount}>My Account</Link>
									</Button>
									<LogoutButton />
								</>
							) : (
								<>
									<Button
										size='3'
										mr='2'
										color={isLoginRoute ? 'teal' : undefined}
										asChild
									>
										<Link to={APP_ROUTES.login}>Login</Link>
									</Button>
									<Button
										size='3'
										mr='2'
										color={isRegisterRoute ? 'teal' : undefined}
										asChild
									>
										<Link to={APP_ROUTES.register}>Register</Link>
									</Button>
								</>
							)}
						</Box>
					</Flex>
				</Box>
			</Box>
		</>
	);
};
export default Header;
