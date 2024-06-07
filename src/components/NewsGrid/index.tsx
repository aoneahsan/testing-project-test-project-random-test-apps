import { searchNewsArticlesApiResponseDummyData } from '@/data/reactQuery';
import { searchedNewsArticlesRStateAtom } from '@/state/newsArticles';
import { INewsItem } from '@/types/newsArticlesFrontend';
import { formatNewsArticlesData } from '@/utils/helpers/reactQuery/newsArticlesBackend';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import NewsGridItem from '../NewsGridItem';
import { Box, Flex, Grid } from '@radix-ui/themes';

const NewsGrid: React.FC = () => {
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
		<Box>
			<Grid
				gap='3'
				columns='6'
			>
				{searchedNewsArticlesRState.map((el) => {
					return (
						<NewsGridItem
							key={el.id}
							newsItemData={el}
						/>
					);
				})}
			</Grid>
		</Box>
	);
};
export default NewsGrid;
