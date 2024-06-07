import NewsGrid from '@/components/NewsGrid';
import { newsFeedArticlesRStateAtom } from '@/state/newsArticles';
import React from 'react';
import { useRecoilState } from 'recoil';

const UserFeed: React.FC = () => {
	const [newsFeedArticlesRState, setNewsFeedArticlesRState] = useRecoilState(
		newsFeedArticlesRStateAtom
	);
	return (
		<>
			<NewsGrid newsArticles={newsFeedArticlesRState} />
		</>
	);
};
export default UserFeed;
