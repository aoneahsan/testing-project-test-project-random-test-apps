import TextInput from '@/components/form/TextInput';
import { RegisterFormFieldsEnum } from '@/enums/formData';
import { registerFormFields } from '@/utils/constants/formFields';
import { registerFormValidationSchema } from '@/validationSchema';
import { Box, Button, Card, Flex, Heading } from '@radix-ui/themes';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import { ZodError } from 'zod';

const Register: React.FC = () => {
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
							Register
						</Heading>
						<RegisterForm />
					</Box>
				</Card>
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

	return (
		<Formik
			initialValues={initialValues}
			validate={(values) => {
				try {
					registerFormValidationSchema.parse(values);
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

export default Register;
