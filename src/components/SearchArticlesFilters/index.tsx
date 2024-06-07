import { Box, Flex, Heading } from '@radix-ui/themes';
import TextInput from '@/components/form/TextInput';
import { Form, Formik } from 'formik';
import { API_URLS } from '@/utils/constants';
import { useMemo } from 'react';
import { useGetRequest } from '@/hooks/reactQuery';
import { ReactQueryKeyEnum } from '@/enums/reactQuery';
import { SearchArticlesFiltersFormFieldsEnum } from '@/enums/formData';
import { ZodError } from 'zod';
import { searchArticlesFormValidationSchema } from '@/validationSchema';
import { searchArticlesFormFields } from '@/utils/constants/formFields';
import FormActionButtons from '../form/FormActionButtons';
import { useSearchParams } from 'react-router-dom';

const SearchArticlesFilters: React.FC = () => {
	return (
		<Box
			className='container'
			pt='4'
		>
			<Heading
				size='4'
				mb='2'
			>
				Search Filters
			</Heading>
			<SearchArticlesFiltersForm />
		</Box>
	);
};

const SearchArticlesFiltersForm: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const keyword =
		searchParams.get(SearchArticlesFiltersFormFieldsEnum.keyword) ??
		'default-keyword';

	console.log({ ml: 'SearchArticlesFiltersForm log1', keyword });

	const initialValues = useMemo(
		() => ({
			[SearchArticlesFiltersFormFieldsEnum.keyword]: '',
			[SearchArticlesFiltersFormFieldsEnum.startDate]: '',
			[SearchArticlesFiltersFormFieldsEnum.endDate]: '',
			[SearchArticlesFiltersFormFieldsEnum.category]: '',
			[SearchArticlesFiltersFormFieldsEnum.source]: '',
		}),
		[]
	);
	// const { data, refetch } = useGetRequest(
	// 	API_URLS.searchNewsArticles,
	// 	ReactQueryKeyEnum.searchNewsArticles
	// );
	// console.log({ ml: 'SearchArticlesFiltersForm log1', data, refetch });

	return (
		<Formik
			initialValues={initialValues}
			validate={(values) => {
				try {
					searchArticlesFormValidationSchema.parse(values);
				} catch (error) {
					if (error instanceof ZodError) {
						return error.formErrors.fieldErrors;
					}
				}
			}}
			onSubmit={async (values, { setErrors }) => {
				const _data: Record<string, string> = {};
				[
					SearchArticlesFiltersFormFieldsEnum.keyword,
					SearchArticlesFiltersFormFieldsEnum.startDate,
					SearchArticlesFiltersFormFieldsEnum.endDate,
					SearchArticlesFiltersFormFieldsEnum.category,
					SearchArticlesFiltersFormFieldsEnum.source,
				].forEach((el) => {
					const _item = values[el];
					if (_item && _item.trim().length > 0) {
						_data[el] = _item;
					}
				});

				setSearchParams(_data);
			}}
		>
			{({ values, errors, touched }) => {
				return (
					<Form>
						<Flex
							justify='between'
							wrap='wrap'
						>
							{(
								Object.keys(
									searchArticlesFormFields
								) as SearchArticlesFiltersFormFieldsEnum[]
							).map((_fieldKey) => {
								return (
									<TextInput
										key={_fieldKey}
										inputName={_fieldKey}
										placeholder={
											searchArticlesFormFields[_fieldKey].placeholder
										}
										type={searchArticlesFormFields[_fieldKey].type}
										value={values[_fieldKey]}
										errorMessage={errors[_fieldKey]}
										isTouched={touched[_fieldKey]}
										showValidState={false}
									/>
								);
							})}
							<FormActionButtons />
						</Flex>
					</Form>
				);
			}}
		</Formik>
	);
};
export default SearchArticlesFilters;
