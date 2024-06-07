import { FormFieldType } from '@/enums';
import {
	RegisterFormFieldsEnum,
	SearchArticlesFiltersFormFieldsEnum,
} from '@/enums/formData';
import dayjs from 'dayjs';

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
		minDate: null,
		maxDate: null,
		options: [],
	},
	[SearchArticlesFiltersFormFieldsEnum.startDate]: {
		type: FormFieldType.date,
		placeholder: 'Start Date',
		minDate: dayjs(new Date()).subtract(31, 'days').toDate(),
		maxDate: dayjs(new Date()).subtract(1, 'days').toDate(),
		options: [],
	},
	[SearchArticlesFiltersFormFieldsEnum.endDate]: {
		type: FormFieldType.date,
		placeholder: 'End Date',
		minDate: dayjs(new Date()).subtract(30, 'days').toDate(),
		maxDate: dayjs(new Date()).toDate(),
		options: [],
	},
	[SearchArticlesFiltersFormFieldsEnum.category]: {
		type: FormFieldType.select,
		placeholder: 'Category',
		minDate: null,
		maxDate: null,
		options: [
			{
				label: 'Sports',
				value: 'sports',
			},
			{
				label: 'Business',
				value: 'business',
			},
			{
				label: 'Entertainment',
				value: 'entertainment'
			}
		],
	},
	[SearchArticlesFiltersFormFieldsEnum.source]: {
		type: FormFieldType.select,
		placeholder: 'Source',
		minDate: null,
		maxDate: null,
		options: [],
	},
} as const;
