import { IUser } from '@/types/userData';
import { atom, selector } from 'recoil';

export const userDataRStateAtom = atom<IUser | null>({
	key: 'userDataRStateAtom_key',
	default: null,
});

export const userIsAuthenticatedRStateSelector = selector<boolean>({
	key: 'userIsAuthenticated_key',
	get: ({ get }) => {
		try {
			const userData = get(userDataRStateAtom);

			if (userData && userData.id && userData?.email) {
				return true;
			}

			return false;
		} catch (error) {
			return false;
		}
	},
});
