import NewsGridItem from '../NewsGridItem';
import { Box, Grid } from '@radix-ui/themes';

import './styles.css';
import { INewsItem } from '@/types/newsArticlesFrontend';
import FullPageCenteredMessage from '../FullPageCenteredMessage';
import { useResponsiveScales } from '@/hooks/reactResponsive';

interface INewsGridProps {
	newsArticles: INewsItem[];
}

const NewsGrid: React.FC<INewsGridProps> = ({ newsArticles }) => {
	const { isMobile, isTablet, isDesktop, isLargeScreen } =
		useResponsiveScales();

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
