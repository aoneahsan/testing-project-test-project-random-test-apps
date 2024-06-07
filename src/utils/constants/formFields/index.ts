import { FormFieldType } from '@/enums';
import {
	RegisterFormFieldsEnum,
	SearchArticlesFiltersFormFieldsEnum,
} from '@/enums/formData';

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
export const searchArticlesFormFields = {
	[SearchArticlesFiltersFormFieldsEnum.keyword]: {
		type: FormFieldType.text,
		placeholder: 'Keyword',
	},
	[SearchArticlesFiltersFormFieldsEnum.startDate]: {
		type: FormFieldType.text,
		placeholder: 'Start Date',
	},
	[SearchArticlesFiltersFormFieldsEnum.endDate]: {
		type: FormFieldType.text,
		placeholder: 'End Date',
	},
	[SearchArticlesFiltersFormFieldsEnum.category]: {
		type: FormFieldType.text,
		placeholder: 'Category',
	},
	[SearchArticlesFiltersFormFieldsEnum.source]: {
		type: FormFieldType.text,
		placeholder: 'Source',
	},
} as const;
