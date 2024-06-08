import { Box, Card, Flex, Heading } from '@radix-ui/themes';
import { Form, Formik } from 'formik';
import { useContext, useMemo, useState } from 'react';
import { NewsFeedPreferenceFormFieldsEnum } from '@/enums/formData';
import {
	newsCategorySelectOptions,
	newsSourceSelectOptions,
	newsFeedPreferenceFormFields,
	newsAuthorSelectOptions,
} from '@/utils/constants/formFields';
import FormActionButtons from '../form/FormActionButtons';
import SelectInput from '../form/SelectInput';
import { useResponsiveScales } from '@/hooks/reactResponsive';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { usePutRequest } from '@/hooks/reactQuery';
import { API_URLS } from '@/utils/constants';
import { IApiResponse } from '@/types/backendApi';
import { IUser } from '@/types/userData';
import {
	formatFormErrorsFromApiResponse,
	setAuthDataInLocalStorage,
} from '@/utils/helpers';
import { showToast } from '@/utils/helpers/capacitorApis';
import { MESSAGES } from '@/utils/messages';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/helpers/reactToastify';
import { useRecoilState } from 'recoil';
import { userDataRStateAtom } from '@/state/userState';
import { reactQueryKeys } from '@/utils/constants/reactQuery';
import { NewsFeedContext } from '@/contextApi';
import { useIsFetching } from '@tanstack/react-query';
import { getReactQueryKey } from '@/utils/helpers/reactQuery';
import { ReactQueryKeyEnum } from '@/enums/reactQuery';

const NewsFeedPreferenceOptions: React.FC = ({}) => {
	return (
		<Box
			className='container'
			pt='4'
		>
			<NewsFeedPreferenceOptionsContent />
		</Box>
	);
};

const NewsFeedPreferenceOptionsContent: React.FC = () => {
	const { isMobile } = useResponsiveScales();
	const [compState, setCompState] = useState<{ isOpen: boolean }>({
		isOpen: false,
	});

	const heading = useMemo(() => {
		return <Heading size='4'>News Feed Preference Options</Heading>;
	}, []);
	const content = useMemo(() => {
		return (
			<Box mt='3'>
				<NewsFeedPreferenceOptionsForm />
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
			{isMobile ? (
				<>
					<Card>
						<Flex
							justify='between'
							align={'center'}
							onClick={toggleAccordionState}
						>
							{heading} {compState.isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
						</Flex>
					</Card>
					{compState.isOpen ? content : null}
				</>
			) : (
				<>
					{heading}
					{content}
				</>
			)}
		</>
	);
};

const NewsFeedPreferenceOptionsForm: React.FC = () => {
	const { isMobile } = useResponsiveScales();
	const [userDataRState, setUserDataRState] =
		useRecoilState(userDataRStateAtom);
	const { mutateAsync: updateUserData, isPending } = usePutRequest(
		reactQueryKeys.mutation.updateUserData
	);
	const newsFeedContextState = useContext(NewsFeedContext);
	const processingApiRequest =
		useIsFetching({
			queryKey: getReactQueryKey(ReactQueryKeyEnum.getNewsFeed),
		}) > 0;
	const disableFormActions = isPending || processingApiRequest;

	const initialValues = useMemo(
		() => ({
			[NewsFeedPreferenceFormFieldsEnum.authors]:
				userDataRState?.newsAuthors ?? '',
			[NewsFeedPreferenceFormFieldsEnum.categories]:
				userDataRState?.newsCategories ?? '',
			[NewsFeedPreferenceFormFieldsEnum.sources]:
				userDataRState?.newsSources ?? '',
		}),
		[
			userDataRState?.newsSources,
			userDataRState?.newsCategories,
			userDataRState?.newsAuthors,
		]
	);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, { setErrors }) => {
				const reqData = JSON.stringify({
					newsSources: values[NewsFeedPreferenceFormFieldsEnum.sources],
					newsCategories: values[NewsFeedPreferenceFormFieldsEnum.categories],
					newsAuthors: values[NewsFeedPreferenceFormFieldsEnum.authors],
				});

				try {
					const res = await updateUserData({
						url: API_URLS.updateUserData,
						data: reqData,
						isAuthenticatedRequest: true,
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

						if (userData) {
							await setAuthDataInLocalStorage({ userData });

							setUserDataRState(userData);

							if (newsFeedContextState.refetchOnUpdate) {
								await newsFeedContextState.refetchOnUpdate();
							}

							showSuccessNotification();
						} else {
							showErrorNotification(MESSAGES.backendApi.invalidUserData);
						}
					}
				} catch (error) {
					showErrorNotification();
				}
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
									newsFeedPreferenceFormFields
								) as NewsFeedPreferenceFormFieldsEnum[]
							).map((_fieldKey) => {
								return (
									<SelectInput
										key={_fieldKey}
										value={values[_fieldKey]}
										inputName={_fieldKey}
										placeholder={
											newsFeedPreferenceFormFields[_fieldKey].placeholder
										}
										errorMessage={errors[_fieldKey]}
										isTouched={touched[_fieldKey]}
										options={
											_fieldKey === NewsFeedPreferenceFormFieldsEnum.categories
												? newsCategorySelectOptions
												: _fieldKey === NewsFeedPreferenceFormFieldsEnum.sources
												? newsSourceSelectOptions
												: _fieldKey === NewsFeedPreferenceFormFieldsEnum.authors
												? newsAuthorSelectOptions
												: []
										}
										isMulti
										disabled={disableFormActions}
									/>
								);
							})}
							<FormActionButtons processing={disableFormActions} />
						</Flex>
					</Form>
				);
			}}
		</Formik>
	);
};
export default NewsFeedPreferenceOptions;
