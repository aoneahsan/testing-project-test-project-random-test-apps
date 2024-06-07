import { APP_ROUTES } from '@/utils/constants';
import { Button, Flex, Heading } from '@radix-ui/themes';
import { useNavigate } from 'react-router';

interface IFullPageCenteredMessageProps {
	message: string;
	showGoToHomeButton?: boolean;
}

const FullPageCenteredMessage: React.FC<IFullPageCenteredMessageProps> = ({
	message,
	showGoToHomeButton = true,
}) => {
	const navigate = useNavigate();

	const navigateBackToHome = () => {
		navigate(APP_ROUTES.home);
	};

	return (
		<Flex
			minHeight='68vh'
			justify='center'
			align='center'
			direction='column'
		>
			<Heading align='center'>{message}</Heading>
			{showGoToHomeButton ? (
				<Button onClick={navigateBackToHome} mt='4'>Go Back Home</Button>
			) : null}
		</Flex>
	);
};
export default FullPageCenteredMessage;
