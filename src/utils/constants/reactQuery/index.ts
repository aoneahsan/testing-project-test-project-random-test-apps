export const reactQueryKeys = {
	user: {
		getUserData: (userId: string) => [userId, 'getUserData'],
		getNewsFeed: (userId: string) => [userId, 'getNewsFeed'],
	},
	newsArticles: {
		searchNewsArticles: ['searchNewsArticles'],
	},
} as const;
