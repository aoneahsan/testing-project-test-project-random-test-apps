import { Box, Button, Flex } from '@radix-ui/themes';
import { useFormikContext } from 'formik';

interface IFormActionButtonsProps {
	showResetButton?: boolean;
	showSubmitButton?: boolean;
	resetButtonText?: string;
	submitButtonText?: string;
}
const FormActionButtons: React.FC<IFormActionButtonsProps> = ({
	resetButtonText,
	showResetButton = true,
	showSubmitButton = true,
	submitButtonText,
}) => {
	const { dirty, isValid } = useFormikContext();
	return (
		<Box mb='3'>
			<Flex justify='between'>
				{showResetButton ? (
					<Button
						type='reset'
						color='red'
						disabled={!dirty}
						mr='4'
					>
						{resetButtonText ?? 'Reset'}
					</Button>
				) : null}
				{showSubmitButton ? (
					<Button
						type='submit'
						disabled={!isValid}
					>
						{submitButtonText ?? 'Submit'}
					</Button>
				) : null}
			</Flex>
		</Box>
	);
};

export default FormActionButtons;
