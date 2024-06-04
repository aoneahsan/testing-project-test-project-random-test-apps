import FullPageLoader from '@/components/FullPageLoader';
import { userDataRStateAtom } from '@/state/userState';
import { getAuthDataFromLocalStorage } from '@/utils/helpers';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '@/utils/constants';

const AuthenticationHOC: React.FC<{
	children: ReactNode;
	isAuthenticatedView: boolean;
}> = ({ children, isAuthenticatedView }) => {
	const [compState, setCompState] = useState<{ processing: boolean }>({
		processing: true,
	});
	const [userDataRState, setUserDataRState] =
		useRecoilState(userDataRStateAtom);

	useEffect(() => {
		try {
			(async () => {
				const _authData = await getAuthDataFromLocalStorage();

				if (_authData?.authToken && _authData?.userData?.email) {
					setUserDataRState(_authData?.userData);
				}
				setCompState((oldState) => ({
					...oldState,
					processing: false,
				}));
			})();
		} catch (error) {
			setCompState((oldState) => ({
				...oldState,
				processing: false,
			}));
		}
	}, []);

	useEffect(() => {}, []);

	if (compState.processing) {
		return <FullPageLoader />;
	} else if (!compState.processing) {
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
	}
};
export default AuthenticationHOC;
