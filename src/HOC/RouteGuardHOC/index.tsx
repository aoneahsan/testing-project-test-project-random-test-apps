import { userIsAuthenticatedRStateSelector } from '@/state/userState';
import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '@/utils/constants';

const RouteGuardHOC: React.FC<{
	children: ReactNode;
	isAuthenticatedView: boolean;
}> = ({ children, isAuthenticatedView }) => {
	const userIsAuthenticatedRState = useRecoilValue(
		userIsAuthenticatedRStateSelector
	);

	if (userIsAuthenticatedRState) {
		if (isAuthenticatedView) {
			return children;
		} else {
			return <Navigate to={APP_ROUTES.home} />;
		}
	} else {
		if (isAuthenticatedView) {
			return <Navigate to={APP_ROUTES.login} />;
		} else {
			return children;
		}
	}
};
export default RouteGuardHOC;
