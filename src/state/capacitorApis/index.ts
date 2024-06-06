import { atom } from 'recoil';

export const networkConnectionRStateAtom = atom({
	key: 'networkConnectionRStateAtom_key',
	default: {
		processing: true,
		isConnected: true,
		errorOcurred: false
	},
});
