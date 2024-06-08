import { FormFieldType } from '@/enums';
import {
	NewsFeedPreferenceFormFieldsEnum,
	RegisterFormFieldsEnum,
	SearchArticlesFiltersFormFieldsEnum,
} from '@/enums/formData';
import { ISelectOption } from '@/types/formData';
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
	},
	[SearchArticlesFiltersFormFieldsEnum.startDate]: {
		type: FormFieldType.date,
		placeholder: 'Start Date',
		minDate: dayjs(new Date()).subtract(31, 'days').toDate(),
		maxDate: dayjs(new Date()).subtract(1, 'days').toDate(),
	},
	[SearchArticlesFiltersFormFieldsEnum.endDate]: {
		type: FormFieldType.date,
		placeholder: 'End Date',
		minDate: dayjs(new Date()).subtract(30, 'days').toDate(),
		maxDate: dayjs(new Date()).toDate(),
	},
	[SearchArticlesFiltersFormFieldsEnum.category]: {
		type: FormFieldType.select,
		placeholder: 'Category',
		minDate: null,
		maxDate: null,
	},
	[SearchArticlesFiltersFormFieldsEnum.source]: {
		type: FormFieldType.select,
		placeholder: 'Source',
		minDate: null,
		maxDate: null,
	},
} as const;

export const newsFeedPreferenceFormFields = {
	[NewsFeedPreferenceFormFieldsEnum.authors]: {
		type: FormFieldType.select,
		placeholder: 'Authors',
	},
	[NewsFeedPreferenceFormFieldsEnum.categories]: {
		type: FormFieldType.select,
		placeholder: 'Categories',
	},
	[NewsFeedPreferenceFormFieldsEnum.sources]: {
		type: FormFieldType.select,
		placeholder: 'Sources',
	},
} as const;

export const newsCategorySelectOptions: ISelectOption[] = [
	{
		label: 'sports',
		value: 'sports',
	},
	{
		label: 'business',
		value: 'business',
	},
	{
		label: 'entertainment',
		value: 'entertainment',
	},
];

export const newsSourceSelectOptions: ISelectOption[] = [
	{
		label: 'ign',
		value: 'ign',
	},
	{
		label: 'nfl-news',
		value: 'nfl-news',
	},
	{
		label: 'abc-news',
		value: 'abc-news',
	},
];

export const newsAuthorSelectOptions: ISelectOption[] = [
	{
		label: 'ahsan',
		value: 'ahsan',
	},
	{
		label: 'zaions',
		value: 'zaions',
	},
];
