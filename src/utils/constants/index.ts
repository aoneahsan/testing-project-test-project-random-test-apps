export const LOCALSTORAGE_KEYS = {
	userData: '8f3j3ff-f-3ff3f',
	userAuthToken: 'd7fgf33--3-3--3',
} as const;

export const React_QUERY_KEYS = {
	query: {},
	mutation: {
		updateUserStatus: ['updateUserStatus'],
	},
} as const;

export const APP_ROUTES = {
	home: '/',
	register: '/register',
	login: '/login',
	userFeed: '/feed',
};
