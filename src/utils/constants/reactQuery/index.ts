export const reactQueryKeys = {
	query: {
		user: {
			getUserData: (userId: string) => [userId, 'getUserData'],
			getNewsFeed: (userId: string) => [userId, 'getNewsFeed'],
		},
		newsArticles: {
			searchNewsArticles: ['searchNewsArticles'],
		},
	},
	mutation: {
		login: ['login'],
		register: ['register'],
		logout: ['logout'],
		updateUserData: ['updateUserData'],
		updateUserStatus: ['updateUserStatus'],
	}
} as const;

export const reactQueryOptions = {
	staleTime: {
		fiveMinutes: 5 * 60 * 1000,
	},
} as const;
