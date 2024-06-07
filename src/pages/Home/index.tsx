import NewsGrid from '@/components/NewsGrid';
import SearchArticlesFilters from '@/components/SearchArticlesFilters';
import { searchNewsArticlesApiResponseDummyData } from '@/data/reactQuery';
import { searchedNewsArticlesRStateAtom } from '@/state/newsArticles';
import { INewsItem } from '@/types/newsArticlesFrontend';
import { formatNewsArticlesData } from '@/utils/helpers/reactQuery/newsArticlesBackend';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Home: React.FC = () => {
	const _data = searchNewsArticlesApiResponseDummyData.result?.data;
	const [searchedNewsArticlesRState, setSearchedNewsArticlesRState] =
		useRecoilState(searchedNewsArticlesRStateAtom);

	let newsArticles: INewsItem[] = [];
	if (_data) {
		newsArticles = formatNewsArticlesData(_data);
	}

	// just for testing for now
	useEffect(() => {
		setSearchedNewsArticlesRState(newsArticles);
	}, []);
	return (
		<>
			<SearchArticlesFilters />
			<NewsGrid newsArticles={searchedNewsArticlesRState} />
		</>
	);
};

export default Home;
