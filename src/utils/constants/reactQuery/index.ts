export const reactQueryKeys = {
	user: {
		getUserData: (userId: string) => [userId, 'getUserData'],
		getNewsFeed: (userId: string) => [userId, 'getNewsFeed'],
	},
	newsArticles: {
		searchNewsArticles: ['searchNewsArticles'],
	},
} as const;

export const reactQueryOptions = {
	staleTime: {
		fiveMinutes: 5 * 60 * 1000,
	},
} as const;
