import { APP_ROUTES } from '@/utils/constants';
import { Button, Heading } from '@radix-ui/themes';
import { useNavigate } from 'react-router';

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const navigateBackToHome = () => {
		navigate(APP_ROUTES.home);
	};

	return (
		<>
			<Heading>404 - Not Found</Heading>
			<Button onClick={navigateBackToHome}>Go Back Home</Button>
		</>
	);
};

export default NotFound;
