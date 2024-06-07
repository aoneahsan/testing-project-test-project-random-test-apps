import {
	LoginFormFieldsEnum,
	RegisterFormFieldsEnum,
	SearchArticlesFiltersFormFieldsEnum,
} from '@/enums/formData';

export interface ILoginFormData {
	[LoginFormFieldsEnum.email]: string;
	[LoginFormFieldsEnum.password]: string;
}

export interface IRegisterFormData extends ILoginFormData {
	[RegisterFormFieldsEnum.name]: string;
	[RegisterFormFieldsEnum.passwordConfirmation]: string;
}

export interface ISearchArticlesFiltersFormData {
	[SearchArticlesFiltersFormFieldsEnum.keyword]: string;
	[SearchArticlesFiltersFormFieldsEnum.startDate]: string;
	[SearchArticlesFiltersFormFieldsEnum.endDate]: string;
	[SearchArticlesFiltersFormFieldsEnum.category]: string;
	[SearchArticlesFiltersFormFieldsEnum.source]: string;
}

export interface ISelectOption {
	label: string;
	value: string;
}
