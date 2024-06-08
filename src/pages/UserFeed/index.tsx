import FullPageCenteredMessage from '@/components/FullPageCenteredMessage';
import FullPageLoader from '@/components/FullPageLoader';
import NewsFeedPreferenceOptions from '@/components/NewsFeedPreferenceOptions';
import NewsGrid from '@/components/NewsGrid';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { ReactQueryKeyEnum } from '@/enums/reactQuery';
import { useGetRequest } from '@/hooks/reactQuery';
import { newsFeedArticlesRStateAtom } from '@/state/newsArticles';
import { IApiResponse } from '@/types/backendApi';
import { INewsArticlesApiResponse } from '@/types/backendApi/newsArticlesBackend';
import { API_URLS } from '@/utils/constants';
import { formatNewsArticlesData } from '@/utils/helpers/reactQuery/newsArticlesBackend';
import { showErrorNotification } from '@/utils/helpers/reactToastify';
import { Box } from '@radix-ui/themes'
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const UserFeed: React.FC = () => {
	const [newsFeedArticlesRState, setNewsFeedArticlesRState] = useRecoilState(
		newsFeedArticlesRStateAtom
	);
	const {
		data: response,
		isFetching,
		isError,
	} = useGetRequest(API_URLS.getNewsFeed, ReactQueryKeyEnum.getNewsFeed);

	useEffect(() => {
		try {
			if (!isFetching && !isError) {
				if (response && response.data) {
					const _res = JSON.parse(
						response.data
					) as IApiResponse<INewsArticlesApiResponse>;
					const _newsArticles = _res.result?.data;

					if (_newsArticles) {
						const formattedNewsArticles = formatNewsArticlesData(_newsArticles);
						setNewsFeedArticlesRState(formattedNewsArticles);
					}
				}
			}
		} catch (error) {
			showErrorNotification();
		}
	}, [response, isFetching, isError]);

	if (isFetching) {
		return <FullPageLoader />;
	} else if (isError) {
		return (
			<FullPageCenteredMessage message='Error Occurred while fetching news feed articles, try again later.' />
		);
	} else if (response && response.data) {
		return (
			<>
				<NewsFeedPreferenceOptions />
				<Box mt='4'>
					<NewsGrid newsArticles={newsFeedArticlesRState} />
				</Box>
			</>
		);
	} else {
		return <ErrorBoundary />;
	}
};
export default UserFeed;
