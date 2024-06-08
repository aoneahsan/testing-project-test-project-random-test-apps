import { ReactQueryKeyEnum } from '@/enums/reactQuery';
import { IUser } from '@/types/userData';
import { reactQueryKeys } from '@/utils/constants/reactQuery';

export const getReactQueryKey = (
	key: ReactQueryKeyEnum,
	userData?: IUser | null
) => {
	if (key === ReactQueryKeyEnum.getUserData) {
		return reactQueryKeys.query.user.getUserData(userData?.id ?? '');
	} else if (key === ReactQueryKeyEnum.getNewsFeed) {
		return reactQueryKeys.query.user.getNewsFeed(userData?.id ?? '');
	} else if (key === ReactQueryKeyEnum.searchNewsArticles) {
		return reactQueryKeys.query.newsArticles.searchNewsArticles;
	} else {
		return [];
	}
};
