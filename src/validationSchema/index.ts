import {
	RegisterFormFieldsEnum,
	SearchArticlesFiltersFormFieldsEnum,
} from '@/enums/formData';
import { z as ZOD } from 'zod';

export const registerFormValidationSchema = ZOD.object({
	[RegisterFormFieldsEnum.name]: ZOD.string()
		.trim()
		.min(1, { message: 'Name is Required.' })
		.max(255),
	[RegisterFormFieldsEnum.email]: ZOD.string().email().max(255),
	[RegisterFormFieldsEnum.password]: ZOD.string().min(6).max(30),
	[RegisterFormFieldsEnum.passwordConfirmation]: ZOD.string().min(6).max(30),
}).superRefine((values, ctx) => {
	if (
		values[RegisterFormFieldsEnum.passwordConfirmation] !==
		values[RegisterFormFieldsEnum.password]
	) {
		ctx.addIssue({
			code: 'custom',
			message: 'The passwords did not match',
			path: [RegisterFormFieldsEnum.passwordConfirmation],
		});
	}
});

export const loginFormValidationSchema = ZOD.object({
	[RegisterFormFieldsEnum.email]: ZOD.string().email().max(255),
	[RegisterFormFieldsEnum.password]: ZOD.string().min(6).max(30),
});

export const userAccountFormValidationSchema = ZOD.object({
	[RegisterFormFieldsEnum.name]: ZOD.string()
		.trim()
		.min(1, { message: 'Name is Required.' })
		.max(255),
});

export const searchArticlesFormValidationSchema = ZOD.object({
	[SearchArticlesFiltersFormFieldsEnum.keyword]: ZOD.string().trim().max(255),
	[SearchArticlesFiltersFormFieldsEnum.startDate]: ZOD.string(),
	[SearchArticlesFiltersFormFieldsEnum.endDate]: ZOD.string(),
	[SearchArticlesFiltersFormFieldsEnum.category]: ZOD.string().trim().max(255),
	[SearchArticlesFiltersFormFieldsEnum.source]: ZOD.string().trim().max(255),
});
