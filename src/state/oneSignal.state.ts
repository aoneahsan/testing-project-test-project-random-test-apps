import { create } from 'zustand';

interface IUseOneSignalZState {
	initialized: boolean;
	c1: number;
	r1: {
		o1: string;
		g1: string[];
	};
	setIsInitialized: () => void;
}

export const useOneSignalZState = create<IUseOneSignalZState>((set) => {
	return {
		initialized: false,
		c1: 0,
		r1: { o1: 'yes', g1: ['working'] },
		setIsInitialized: () => {
			return set(() => {
				return {
					initialized: true,
				};
			});
		},
	};
});
