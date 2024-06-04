import TextInput from '@/components/form/TextInput';
import { LoginFormFieldsEnum } from '@/enums/formData';
import { loginFormFields } from '@/utils/constants/formFields';
import { loginFormValidationSchema } from '@/validationSchema';
import { Box, Button, Card, Flex, Heading } from '@radix-ui/themes';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import { ZodError } from 'zod';

const Login: React.FC = () => {
	return (
		<Box>
			<Flex
				justify='center'
				align='center'
				minHeight='100vh'
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
							Login
						</Heading>
						<LoginForm />
					</Box>
				</Card>
			</Flex>
		</Box>
	);
};

const LoginForm: React.FC = () => {
	const initialValues = useMemo(
		() => ({
			[LoginFormFieldsEnum.email]: '',
			[LoginFormFieldsEnum.password]: '',
		}),
		[]
	);

	return (
		<Formik
			initialValues={initialValues}
			validate={(values) => {
				try {
					loginFormValidationSchema.parse(values);
				} catch (error) {
					if (error instanceof ZodError) {
						return error.formErrors.fieldErrors;
					}
				}
			}}
			onSubmit={(values) => {
				console.log({ values });
			}}
		>
			{({ values, errors, touched }) => {
				return (
					<Form>
						{(Object.keys(loginFormFields) as LoginFormFieldsEnum[]).map(
							(_fieldKey) => {
								return (
									<TextInput
										key={_fieldKey}
										inputName={_fieldKey}
										placeholder={loginFormFields[_fieldKey].placeholder}
										type={loginFormFields[_fieldKey].type}
										value={values[_fieldKey]}
										errorMessage={errors[_fieldKey]}
										isTouched={touched[_fieldKey]}
									/>
								);
							}
						)}

						<Box mb='3'>
							<Flex justify='between'>
								<Button
									type='reset'
									color='red'
								>
									Reset
								</Button>
								<Button type='submit'>Submit</Button>
							</Flex>
						</Box>
					</Form>
				);
			}}
		</Formik>
	);
};

export default Login;
