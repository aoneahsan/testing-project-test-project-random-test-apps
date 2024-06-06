import { ReactQueryKeyEnum } from '@/enums/reactQuery';
import { IUser } from '@/types/userData';
import { reactQueryKeys } from '@/utils/constants/reactQuery';

export const getReactQueryKey = (
	key: ReactQueryKeyEnum,
	userData: IUser | null
) => {
	if (key === ReactQueryKeyEnum.getUserData) {
		return reactQueryKeys.user.getUserData(userData?.id ?? '');
	} else if (key === ReactQueryKeyEnum.getNewsFeed) {
		return reactQueryKeys.user.getNewsFeed(userData?.id ?? '');
	} else if (key === ReactQueryKeyEnum.searchNewsArticles) {
		return reactQueryKeys.newsArticles.searchNewsArticles;
	} else {
		return [];
	}
};
