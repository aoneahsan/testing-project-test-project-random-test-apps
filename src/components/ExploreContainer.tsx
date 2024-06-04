import { Button, Flex, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

const ExploreContainer: React.FC = () => {
	const navigate = useNavigate();

	const navigateToRegisterPage = () => {
		navigate('/register');
	};
	return (
		<Flex
			direction='column'
			gap='2'
		>
			<Text>Hello from Radix Themes :)</Text>
			<Button onClick={navigateToRegisterPage}>Let's go</Button>
		</Flex>
	);
};

export default ExploreContainer;
