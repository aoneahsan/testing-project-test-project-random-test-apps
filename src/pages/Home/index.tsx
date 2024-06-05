import LogoutButton from '@/components/LogoutButton';
import { APP_ROUTES } from '@/utils/constants';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router';

const Home: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<h1>home</h1>
			<Button
				onClick={() => {
					navigate(APP_ROUTES.myAccount);
				}}
			>
				My Account
			</Button>
			<LogoutButton />
		</>
	);
};

export default Home;
