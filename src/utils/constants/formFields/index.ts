import { FormFieldType } from '@/enums';
import { RegisterFormFieldsEnum } from '@/enums/formData';

export const loginFormFields = {
	[RegisterFormFieldsEnum.email]: {
		type: FormFieldType.email,
		placeholder: 'Email',
	},
	[RegisterFormFieldsEnum.password]: {
		type: FormFieldType.password,
		placeholder: 'Password',
	},
} as const;

export const registerFormFields = {
	[RegisterFormFieldsEnum.name]: {
		type: FormFieldType.text,
		placeholder: 'Name',
	},
	...loginFormFields,
	[RegisterFormFieldsEnum.passwordConfirmation]: {
		type: FormFieldType.password,
		placeholder: 'Password Confirmation',
	},
} as const;
export const userAccountDataFormFields = {
	[RegisterFormFieldsEnum.name]: {
		type: FormFieldType.text,
		placeholder: 'Name',
	},
} as const;
