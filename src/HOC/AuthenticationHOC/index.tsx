import FullPageLoader from '@/components/FullPageLoader';
import { userDataRStateAtom } from '@/state/userState';
import { getAuthDataFromLocalStorage } from '@/utils/helpers';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Navigate } from 'react-router-dom';
import { API_URLS, APP_ROUTES } from '@/utils/constants';
import { useGetRequest, usePostRequest } from '@/hooks/reactQuery';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { MESSAGES } from '@/utils/messages';
import { IApiResponse } from '@/types/backendApi';
import { IUser } from '@/types/userData';

const AuthenticationHOC: React.FC<{
	children: ReactNode;
	isAuthenticatedView: boolean;
}> = ({ children, isAuthenticatedView }) => {
	const [compState, setCompState] = useState<{ processing: boolean }>({
		processing: true,
	});
	const [userDataRState, setUserDataRState] =
		useRecoilState(userDataRStateAtom);
	const { mutateAsync: updateUserStatus } = usePostRequest();
	const {
		data: response,
		isFetching,
		isError,
	} = useGetRequest(API_URLS.getUserData);

	useEffect(() => {
		try {
			(async () => {
				const _authData = await getAuthDataFromLocalStorage();

				if (_authData?.authToken && _authData?.userData?.email) {
					// update user status in backend (lastActiveAt)
					await updateUserStatus({
						url: API_URLS.updateUserStatus,
						isAuthenticatedRequest: true,
					});
				}
			})();
		} catch (error) {}
	}, []);

	useEffect(() => {
		if (!isFetching && !isError) {
			if (response && response.data) {
				try {
					const _res = JSON.parse(response.data) as IApiResponse<IUser>;
					const userData = _res.result?.data;

					if (userData) {
						setUserDataRState(userData);
					}
					setCompState((oldState) => ({
						...oldState,
						processing: false,
					}));
				} catch (error) {
					setCompState((oldState) => ({
						...oldState,
						processing: false,
					}));
				}
			} else {
				setCompState((oldState) => ({
					...oldState,
					processing: false,
				}));
			}
		}
	}, [response, isFetching, isError]);

	if (compState.processing || isFetching) {
		return <FullPageLoader />;
	} else if (!compState.processing && !isError) {
		if (isAuthenticatedView) {
			if (userDataRState?.email) {
				return children;
			} else {
				return <Navigate to={APP_ROUTES.login} />;
			}
		} else {
			if (userDataRState?.email) {
				return <Navigate to={APP_ROUTES.home} />;
			} else {
				return children;
			}
		}
	} else {
		return <ErrorBoundary message={MESSAGES.errors.authCheckFailed} />;
	}
};
export default AuthenticationHOC;
