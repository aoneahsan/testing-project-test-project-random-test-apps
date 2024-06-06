import FullPageLoader from '@/components/FullPageLoader';
import { userDataRStateAtom } from '@/state/userState';
import { getAuthDataFromLocalStorage } from '@/utils/helpers';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { matchRoutes, useNavigate } from 'react-router-dom';
import { API_URLS, APP_ROUTES } from '@/utils/constants';
import { useGetRequest, usePostRequest } from '@/hooks/reactQuery';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { MESSAGES } from '@/utils/messages';
import { IApiResponse } from '@/types/backendApi';
import { IUser } from '@/types/userData';
import { useLocation } from 'react-router';
import { ReactQueryKeyEnum } from '@/enums/reactQuery';

const AuthenticationHOC: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [compState, setCompState] = useState<{ processing: boolean }>({
		processing: true,
	});
	const setUserDataRState = useSetRecoilState(userDataRStateAtom);
	const { mutateAsync: updateUserStatus } = usePostRequest();
	const {
		data: response,
		isFetching,
		isError,
	} = useGetRequest(API_URLS.getUserData, ReactQueryKeyEnum.getUserData);
	const navigate = useNavigate();
	const location = useLocation();
	const rootRouteMatched = matchRoutes(
		[{ path: APP_ROUTES.rootRoute }],
		location
	);
	const isRootRoute = rootRouteMatched && rootRouteMatched?.length > 0;

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

					if (userData && userData.id) {
						setUserDataRState(userData);

						if (isRootRoute) {
							navigate(APP_ROUTES.home);
						}
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
				setUserDataRState(null);

				setCompState((oldState) => ({
					...oldState,
					processing: false,
				}));

				if (isRootRoute) {
					navigate(APP_ROUTES.login);
				}
			}
		}
	}, [response, isFetching, isError, isRootRoute]);

	if (compState.processing || isFetching) {
		return <FullPageLoader />;
	} else if (!compState.processing && !isError) {
		return children;
	} else {
		return <ErrorBoundary message={MESSAGES.errors.authCheckFailed} />;
	}
};
export default AuthenticationHOC;
