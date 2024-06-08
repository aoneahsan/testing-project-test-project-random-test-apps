import { Box, Card, Flex, Heading } from '@radix-ui/themes';
import TextInput from '@/components/form/TextInput';
import { Form, Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { SearchArticlesFiltersFormFieldsEnum } from '@/enums/formData';
import { ZodError } from 'zod';
import { searchArticlesFormValidationSchema } from '@/validationSchema';
import {
	newsCategorySelectOptions,
	newsSourceSelectOptions,
	searchArticlesFormFields,
} from '@/utils/constants/formFields';
import FormActionButtons from '../form/FormActionButtons';
import { useSearchParams } from 'react-router-dom';
import { FormFieldType } from '@/enums';
import DatePickerInput from '../form/DatePickerInput';
import { getSearchParamsData, setSearchParamsData } from '@/utils/helpers';
import { ISearchArticlesFiltersSearchParams } from '@/types/searchParams';
import SelectInput from '../form/SelectInput';
import { useResponsiveScales } from '@/hooks/reactResponsive';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

const SearchArticlesFilters: React.FC = () => {
	return (
		<Box
			className='container'
			pt='4'
		>
			<SearchArticlesFiltersContent />
		</Box>
	);
};

const SearchArticlesFiltersContent: React.FC = () => {
	const { isMobile } = useResponsiveScales();
	const [compState, setCompState] = useState<{ isOpen: boolean }>({
		isOpen: false,
	});

	const heading = useMemo(() => {
		return <Heading size='4'>Search Filters</Heading>;
	}, []);
	const content = useMemo(() => {
		return (
			<Box mt='3'>
				<SearchArticlesFiltersForm />
			</Box>
		);
	}, []);

	const toggleAccordionState = () => {
		setCompState((oldState) => ({
			...oldState,
			isOpen: !oldState.isOpen,
		}));
	};

	return (
		<>
			<Card>
				{isMobile ? (
					<>
						<Flex
							justify='between'
							align={'center'}
							onClick={toggleAccordionState}
						>
							{heading} {compState.isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
						</Flex>
						{compState.isOpen ? content : null}
					</>
				) : (
					<>
						{heading}
						{content}
					</>
				)}
			</Card>
		</>
	);
};

const SearchArticlesFiltersForm: React.FC = () => {
	const { isMobile } = useResponsiveScales();
	const [_searchParams, _setSearchParams] = useSearchParams();
	const searchParamsData =
		getSearchParamsData<ISearchArticlesFiltersSearchParams>(_searchParams);

	const initialValues = useMemo(
		() => ({
			[SearchArticlesFiltersFormFieldsEnum.keyword]:
				searchParamsData?.keyword ?? '',
			[SearchArticlesFiltersFormFieldsEnum.startDate]:
				searchParamsData?.startDate ?? '',
			[SearchArticlesFiltersFormFieldsEnum.endDate]:
				searchParamsData?.endDate ?? '',
			[SearchArticlesFiltersFormFieldsEnum.category]:
				searchParamsData?.category ?? '',
			[SearchArticlesFiltersFormFieldsEnum.source]:
				searchParamsData?.source ?? '',
		}),
		[
			searchParamsData?.keyword,
			searchParamsData?.startDate,
			searchParamsData?.endDate,
			searchParamsData?.category,
			searchParamsData?.source,
		]
	);

	const onResetClicked = useCallback(() => {
		_setSearchParams(undefined);
	}, []);

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
			onSubmit={async (values) => {
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

				setSearchParamsData(_data, _setSearchParams);
			}}
			enableReinitialize
		>
			{({ values, errors, touched }) => {
				return (
					<Form>
						<Flex
							justify='between'
							align={isMobile ? 'stretch' : 'center'}
							wrap='wrap'
							direction={isMobile ? 'column' : 'row'}
						>
							{(
								Object.keys(
									searchArticlesFormFields
								) as SearchArticlesFiltersFormFieldsEnum[]
							).map((_fieldKey) => {
								if (
									searchArticlesFormFields[_fieldKey].type ===
									FormFieldType.date
								) {
									return (
										<DatePickerInput
											key={_fieldKey}
											value={values[_fieldKey]}
											inputName={_fieldKey}
											placeholder={
												searchArticlesFormFields[_fieldKey].placeholder
											}
											minDate={searchArticlesFormFields[_fieldKey].minDate}
											maxDate={searchArticlesFormFields[_fieldKey].maxDate}
											errorMessage={errors[_fieldKey]}
											isTouched={touched[_fieldKey]}
										/>
									);
								} else if (
									searchArticlesFormFields[_fieldKey].type ===
									FormFieldType.select
								) {
									return (
										<SelectInput
											key={_fieldKey}
											value={values[_fieldKey]}
											inputName={_fieldKey}
											placeholder={
												searchArticlesFormFields[_fieldKey].placeholder
											}
											errorMessage={errors[_fieldKey]}
											isTouched={touched[_fieldKey]}
											options={
												_fieldKey ===
												SearchArticlesFiltersFormFieldsEnum.category
													? newsCategorySelectOptions
													: _fieldKey ===
													  SearchArticlesFiltersFormFieldsEnum.source
													? newsSourceSelectOptions
													: null
											}
										/>
									);
								} else {
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
								}
							})}
							<FormActionButtons onResetClicked={onResetClicked} />
						</Flex>
					</Form>
				);
			}}
		</Formik>
	);
};
export default SearchArticlesFilters;
