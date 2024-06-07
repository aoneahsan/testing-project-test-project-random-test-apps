import FullPageCenteredMessage from '@/components/FullPageCenteredMessage';
import { newsDetailRStateSelectorFamily } from '@/state/newsArticles';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

const NewsDetail: React.FC = () => {
	const { newsId } = useParams();
	const newsDetailRState = useRecoilValue(
		newsDetailRStateSelectorFamily(newsId)
	);

	return (
		<>
			{newsDetailRState && newsDetailRState.id ? (
				<>
					NewsId = {newsId}, data = {JSON.stringify(newsDetailRState)}
				</>
			) : (
				<FullPageCenteredMessage
					message='No News Article Found, Please try again
				later!'
				/>
			)}
		</>
	);
};

export default NewsDetail;
