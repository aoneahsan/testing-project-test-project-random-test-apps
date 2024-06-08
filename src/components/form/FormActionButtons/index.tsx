import { Box, Button, Flex } from '@radix-ui/themes';
import { useFormikContext } from 'formik';

interface IFormActionButtonsProps {
	showResetButton?: boolean;
	showSubmitButton?: boolean;
	resetButtonText?: string;
	submitButtonText?: string;
	onResetClicked?: () => void;
	processing?: boolean;
}
const FormActionButtons: React.FC<IFormActionButtonsProps> = ({
	resetButtonText,
	showResetButton = true,
	showSubmitButton = true,
	submitButtonText,
	onResetClicked,
	processing,
}) => {
	const { dirty, isValid } = useFormikContext();
	return (
		<Box mb='3'>
			<Flex justify='between'>
				{showResetButton ? (
					<Button
						type={!!onResetClicked ? 'button' : 'reset'}
						color='red'
						disabled={processing || (onResetClicked ? false : !dirty)}
						mr='4'
						onClick={onResetClicked}
					>
						{resetButtonText ?? 'Reset'}
					</Button>
				) : null}
				{showSubmitButton ? (
					<Button
						type='submit'
						disabled={!isValid || processing}
					>
						{submitButtonText ?? 'Submit'}
					</Button>
				) : null}
			</Flex>
		</Box>
	);
};

export default FormActionButtons;
