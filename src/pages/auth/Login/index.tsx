import { userDataRStateAtom } from '@/state/userState';
import { IUser } from '@/types/userData';
import { APP_ROUTES } from '@/utils/constants';
import { setAuthDataInLocalStorage } from '@/utils/helpers';
import { Button, Heading } from '@radix-ui/themes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const Login: React.FC = () => {
	const setUserDataRState = useSetRecoilState(userDataRStateAtom);
	const navigate = useNavigate();

	const dummyLogin = async () => {
		const _user: IUser = {
			email: 'aoneahsan@gmail.com',
			id: '1',
			name: 'Ahsan Mahmood',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const authToken = 'dummy auth Token';

		await setAuthDataInLocalStorage({ userData: _user, authToken });

		setUserDataRState(_user);

		navigate(APP_ROUTES.home);
	};
	return (
		<>
			<Heading>Login</Heading>
			<Button onClick={dummyLogin}>login</Button>
		</>
	);
};
export default Login;
