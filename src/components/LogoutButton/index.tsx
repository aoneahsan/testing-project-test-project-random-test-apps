import { useDeleteRequest } from '@/hooks/reactQuery';
import { userDataRStateAtom } from '@/state/userState';
import { API_URLS } from '@/utils/constants';
import { clearAuthDataFromLocalStorage } from '@/utils/helpers';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/helpers/react-toastify';
import { Button } from '@radix-ui/themes';
import { useSetRecoilState } from 'recoil';

const LogoutButton: React.FC = () => {
	const setUserDataRState = useSetRecoilState(userDataRStateAtom);
	const { mutateAsync: logoutUser } = useDeleteRequest();

	const onLogout = async () => {
		try {
			await logoutUser({
				url: API_URLS.logout,
				isAuthenticatedRequest: true,
			});

			await clearAuthDataFromLocalStorage();
			showSuccessNotification();
			setUserDataRState(null);
		} catch (error) {
			showErrorNotification();
		}
	};

	return (
		<Button
			onClick={onLogout}
			size='3'
			color='red'
		>
			Logout
		</Button>
	);
};
export default LogoutButton;
