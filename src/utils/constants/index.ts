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
	wildCard: '*',
	rootRoute: '/',
	home: '/news-articles',
	register: '/register',
	login: '/login',
	userFeed: '/feed',
	myAccount: '/my-account',
};
export const API_URLS = {
	register: '/register',
	login: '/login',
	logout: '/logout',
	getUserData: '/getUserData',
	updateUserData: '/updateUserData',
	updateUserStatus: '/updateUserStatus',
};
