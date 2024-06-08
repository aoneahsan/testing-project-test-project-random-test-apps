import {
	LoginFormFieldsEnum,
	RegisterFormFieldsEnum,
	SearchArticlesFiltersFormFieldsEnum,
	UserAccountDataFormFieldsEnum,
} from '@/enums/formData';
import dayjs from 'dayjs';
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
	[LoginFormFieldsEnum.email]: ZOD.string().email().max(255),
	[LoginFormFieldsEnum.password]: ZOD.string().min(6).max(30),
});

export const userAccountFormValidationSchema = ZOD.object({
	[UserAccountDataFormFieldsEnum.name]: ZOD.string()
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
}).superRefine((values, ctx) => {
	const startDateStr = values[SearchArticlesFiltersFormFieldsEnum.startDate];
	const endDateStr = values[SearchArticlesFiltersFormFieldsEnum.endDate];

	if (startDateStr.trim().length > 0 && endDateStr.trim().length > 0) {
		if (startDateStr === endDateStr) {
			ctx.addIssue({
				code: 'custom',
				message: 'Start Date can not be equal to end date.',
				path: [SearchArticlesFiltersFormFieldsEnum.startDate],
			});
		} else {
			let startDate;
			try {
				startDate = dayjs(startDateStr);
			} catch (error) {
				ctx.addIssue({
					code: 'custom',
					message: 'Invalid Start Date value.',
					path: [SearchArticlesFiltersFormFieldsEnum.startDate],
				});
			}

			let endDate;
			try {
				endDate = dayjs(endDateStr);
			} catch (error) {
				ctx.addIssue({
					code: 'custom',
					message: 'Invalid End Date value.',
					path: [SearchArticlesFiltersFormFieldsEnum.endDate],
				});
			}

			if (startDate && endDate) {
				const endDateIsBeforeStartDate = dayjs(endDate).isBefore(startDate);
				if (endDateIsBeforeStartDate) {
					ctx.addIssue({
						code: 'custom',
						message: 'End Date can not be before Start Date.',
						path: [SearchArticlesFiltersFormFieldsEnum.endDate],
					});
				}
			}
		}
	}
});
