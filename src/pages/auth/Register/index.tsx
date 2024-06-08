import HandleFormValidationState from '@/components/HandleFormValidationState';
import FormActionButtons from '@/components/form/FormActionButtons';
import TextInput from '@/components/form/TextInput';
import { RegisterFormFieldsEnum } from '@/enums/formData';
import { usePostRequest } from '@/hooks/reactQuery';
import { formValidationRStateAtom } from '@/state/formState';
import { userDataRStateAtom } from '@/state/userState';
import { IApiResponse } from '@/types/backendApi';
import { IUser } from '@/types/userData';
import { API_URLS, APP_ROUTES } from '@/utils/constants';
import { registerFormFields } from '@/utils/constants/formFields';
import { reactQueryKeys } from '@/utils/constants/reactQuery';
import {
	formatFormErrorsFromApiResponse,
	setAuthDataInLocalStorage,
} from '@/utils/helpers';
import { showToast } from '@/utils/helpers/capacitorApis';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/helpers/reactToastify';
import { MESSAGES } from '@/utils/messages';
import { registerFormValidationSchema } from '@/validationSchema';
import { Box, Button, Card, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ZodError } from 'zod';

const Register: React.FC = () => {
	const navigate = useNavigate();

	const navigateToLoginPage = () => {
		navigate(APP_ROUTES.login);
	};
	return (
		<Box>
			<Flex
				justify='center'
				align='center'
				minHeight='100vh'
				direction='column'
			>
				<Card>
					<Box
						minWidth='250px'
						width='80vw'
						maxWidth='500px'
					>
						<Heading
							mb='4'
							align='center'
						>
							Register
						</Heading>
						<RegisterForm />
					</Box>
				</Card>
				<Text mt='3'>
					Already have a account?{' '}
					<Link
						onClick={navigateToLoginPage}
						className='pointer'
					>
						Login
					</Link>
				</Text>

				<HandleFormValidationState />
			</Flex>
		</Box>
	);
};

const RegisterForm: React.FC = () => {
	const initialValues = useMemo(
		() => ({
			[RegisterFormFieldsEnum.name]: '',
			[RegisterFormFieldsEnum.email]: '',
			[RegisterFormFieldsEnum.password]: '',
			[RegisterFormFieldsEnum.passwordConfirmation]: '',
		}),
		[]
	);
	const { mutateAsync: registerUser } = usePostRequest(
		reactQueryKeys.mutation.register
	);
	const setUserDataRState = useSetRecoilState(userDataRStateAtom);
	const formValidationRState = useRecoilValue(formValidationRStateAtom);

	return (
		<Formik
			initialValues={initialValues}
			validate={(values) => {
				if (formValidationRState.frontendFormValidationIsEnabled) {
					try {
						registerFormValidationSchema.parse(values);
					} catch (error) {
						if (error instanceof ZodError) {
							return error.formErrors.fieldErrors;
						}
					}
				}
			}}
			onSubmit={async (values, { setErrors }) => {
				const reqData = JSON.stringify({
					name: values[RegisterFormFieldsEnum.name],
					email: values[RegisterFormFieldsEnum.email],
					password: values[RegisterFormFieldsEnum.password],
					password_confirmation:
						values[RegisterFormFieldsEnum.passwordConfirmation], // backend laravel API requires us to send "password_confirmation" to confirm the password
				});

				try {
					const res = await registerUser({
						url: API_URLS.register,
						data: reqData,
					});

					const resData = JSON.parse(res.data) as IApiResponse<IUser>;

					if (resData.errors) {
						const _errors = formatFormErrorsFromApiResponse(resData.errors);
						if (_errors) {
							showToast(MESSAGES.general.invalidData);
							setErrors(_errors);
						}
					} else {
						const userData = resData.result?.data;
						const authToken = resData.result?.authToken;

						if (userData && authToken) {
							await setAuthDataInLocalStorage({ userData, authToken });

							showSuccessNotification();

							setUserDataRState(userData);
						} else {
							showErrorNotification(MESSAGES.backendApi.invalidUserData);
						}
					}
				} catch (error) {
					showErrorNotification();
				}
			}}
		>
			{({ values, errors, touched, isValid, dirty }) => {
				return (
					<Form>
						{(Object.keys(registerFormFields) as RegisterFormFieldsEnum[]).map(
							(_fieldKey) => {
								return (
									<TextInput
										key={_fieldKey}
										inputName={_fieldKey}
										placeholder={registerFormFields[_fieldKey].placeholder}
										type={registerFormFields[_fieldKey].type}
										value={values[_fieldKey]}
										errorMessage={errors[_fieldKey]}
										isTouched={touched[_fieldKey]}
									/>
								);
							}
						)}

						<FormActionButtons />
					</Form>
				);
			}}
		</Formik>
	);
};

export default Register;
