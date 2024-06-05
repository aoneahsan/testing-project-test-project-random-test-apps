import { atom } from 'recoil';

// NOTE: this is just for this project, just to showcase that i have handled the backend API error validation as well, in real world project this will be redundant
export const formValidationRStateAtom = atom<{
	frontendFormValidationIsEnabled: boolean;
}>({
	key: 'formValidationRStateAtom_key',
	default: {
		frontendFormValidationIsEnabled: true,
	},
});
