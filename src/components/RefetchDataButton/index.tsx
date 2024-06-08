import { Button, Flex } from '@radix-ui/themes';

interface IRefetchDataButtonProps {
	onClick: () => void;
	refetchButtonText?: string;
}

const RefetchDataButton: React.FC<IRefetchDataButtonProps> = ({
	onClick,
	refetchButtonText = 'Refetch Data',
}) => {
	return (
		<Flex
			justify='end'
			align='center'
			className='container'
		>
			<Button
				onClick={onClick}
				className='w-full'
			>
				{refetchButtonText}
			</Button>
		</Flex>
	);
};

export default RefetchDataButton;
