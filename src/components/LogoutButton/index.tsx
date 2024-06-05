import { userDataRStateAtom } from '@/state/userState';
import { clearAuthDataFromLocalStorage } from '@/utils/helpers';
import { Button } from '@radix-ui/themes';
import { useSetRecoilState } from 'recoil';

const LogoutButton: React.FC = () => {
	const setUserDataRState = useSetRecoilState(userDataRStateAtom);

	const onLogout = async () => {
		await clearAuthDataFromLocalStorage();

		setUserDataRState(null);
	};

	return <Button onClick={onLogout}>Logout</Button>;
};
export default LogoutButton;
