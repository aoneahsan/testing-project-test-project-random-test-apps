import NewsGridItem from '../NewsGridItem';
import { Box, Flex, Grid, Heading } from '@radix-ui/themes';

import './styles.css';
import { useMediaQuery } from 'react-responsive';
import { INewsItem } from '@/types/newsArticlesFrontend';
import FullPageCenteredMessage from '../FullPageCenteredMessage';

interface INewsGridProps {
	newsArticles: INewsItem[];
}

const NewsGrid: React.FC<INewsGridProps> = ({ newsArticles }) => {
	const isLargeScreen = useMediaQuery({
		minWidth: '1900px',
	});
	const isDesktop = useMediaQuery({
		minWidth: '1350px',
	});
	const isTablet = useMediaQuery({
		minWidth: '1000px',
	});
	const isMobile = useMediaQuery({
		maxWidth: '700px',
	});
	return (
		<Box
			className='container'
			py='6'
		>
			{newsArticles.length > 0 ? (
				<Grid
					gap='6'
					columns={
						isLargeScreen
							? '5'
							: isDesktop
							? '4'
							: isTablet
							? '3'
							: isMobile
							? '1'
							: '2'
					}
					className='grid-column-equal-height'
				>
					{newsArticles?.map((el) => {
						return (
							<NewsGridItem
								key={el.id}
								newsItemData={el}
							/>
						);
					})}
				</Grid>
			) : (
				<FullPageCenteredMessage
					message='No News Articles Found, Please Update the setting and try again
				later!'
				/>
			)}
		</Box>
	);
};
export default NewsGrid;
