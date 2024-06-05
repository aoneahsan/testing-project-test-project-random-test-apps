import { FormFieldType } from '@/enums';
import {
	LoginFormFieldsEnum,
	RegisterFormFieldsEnum,
	UserAccountDataFormFieldsEnum,
} from '@/enums/formData';
import { ILoginFormData, IRegisterFormData } from '@/types/formData';
import { Box, IconButton, Text, TextField } from '@radix-ui/themes';
import { useFormikContext } from 'formik';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface TextInputProps {
	inputName:
		| RegisterFormFieldsEnum
		| LoginFormFieldsEnum
		| UserAccountDataFormFieldsEnum;
	placeholder: string;
	type: FormFieldType;
	value: string | number | undefined;
	errorMessage: string | undefined;
	isTouched: boolean | undefined;
}

const TextInput: React.FC<TextInputProps> = ({
	inputName,
	placeholder,
	type,
	value,
	errorMessage,
	isTouched,
}) => {
	const [compState, setCompState] = useState<{ showPassword: boolean }>({
		showPassword: false,
	});
	const { handleChange, handleBlur } = useFormikContext<
		IRegisterFormData | ILoginFormData
	>();

	const changeShowPasswordState = () => {
		setCompState((oldState) => ({
			...oldState,
			showPassword: !oldState.showPassword,
		}));
	};

	return (
		<Box mb='3'>
			<TextField.Root
				size='3'
				placeholder={placeholder}
				type={compState.showPassword ? FormFieldType.text : type}
				name={inputName}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				color={errorMessage ? 'red' : isTouched ? 'green' : undefined}
				variant={isTouched ? 'soft' : 'surface'}
			>
				{type === FormFieldType.password ? (
					<TextField.Slot
						pr='3'
						side='right'
					>
						<IconButton
							size='2'
							variant='ghost'
							onClick={changeShowPasswordState}
						>
							{compState.showPassword ? (
								<EyeOpenIcon
									height='16'
									width='16'
								/>
							) : (
								<EyeClosedIcon
									height='16'
									width='16'
								/>
							)}
						</IconButton>
					</TextField.Slot>
				) : null}
			</TextField.Root>
			{isTouched && errorMessage ? (
				<Text
					color='red'
					size='1'
					ml='1'
				>
					{errorMessage}
				</Text>
			) : null}
		</Box>
	);
};
export default TextInput;
