import { useDeleteRequest } from '@/hooks/reactQuery';
import { userDataRStateAtom } from '@/state/userState';
import { API_URLS } from '@/utils/constants';
import { clearAuthDataFromLocalStorage } from '@/utils/helpers';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/helpers/reactToastify';
import { Button } from '@radix-ui/themes';
import { useSetRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';

const LogoutButton: React.FC = () => {
	const setUserDataRState = useSetRecoilState(userDataRStateAtom);
	const { mutateAsync: logoutUser } = useDeleteRequest();

	const isDesktop = useMediaQuery({
		minWidth: '901px',
	});
	const isMobile = useMediaQuery({
		maxWidth: '700px',
	});

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
			size={isDesktop ? '3' : '2'}
			color='red'
			mb={isMobile ? '2' : '0'}
		>
			Logout
		</Button>
	);
};
export default LogoutButton;
