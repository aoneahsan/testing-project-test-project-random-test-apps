import FullPageCenteredMessage from '@/components/FullPageCenteredMessage';
import { useResponsiveScales } from '@/hooks/reactResponsive';
import { newsDetailRStateSelectorFamily } from '@/state/newsArticles';
import { INewsItem } from '@/types/newsArticlesFrontend';
import { BROWSER } from '@/utils/helpers/capacitorApis';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes';
import { useCallback } from 'react';
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
				<NewsDetailContent newsItemData={newsDetailRState} />
			) : (
				<FullPageCenteredMessage
					message='No News Article Found, Please try again
				later!'
				/>
			)}
		</>
	);
};

interface INewsDetailContentProps {
	newsItemData: INewsItem;
}

const NewsDetailContent: React.FC<INewsDetailContentProps> = ({
	newsItemData,
}) => {
	const { isLargeScreen, isDesktop, isTablet } = useResponsiveScales();

	const openNewsUrl = useCallback(() => {
		if (newsItemData.newsUrl) {
			BROWSER.open(newsItemData.newsUrl);
		}
	}, [newsItemData.newsUrl]);
	return (
		<Box
			className='container'
			py='5'
		>
			<Heading
				align='center'
				mt='2'
				mb='6'
				size={isLargeScreen ? '8' : isDesktop ? '7' : '6'}
			>
				{newsItemData.title}
			</Heading>
			<Flex
				justify='center'
				align='center'
			>
				<Box
					width={
						isLargeScreen ? '40%' : isDesktop ? '60%' : isTablet ? '85%' : '94%'
					}
				>
					<img
						src={newsItemData.imageUrl}
						alt={newsItemData.title}
						width='100%'
						height='100%'
						className='object-cover'
					/>
				</Box>
			</Flex>
			<Box my='6'>
				<Text>{newsItemData.longDescription}</Text>
			</Box>
			{newsItemData.newsUrl ? (
				<Button
					className='w-full'
					onClick={openNewsUrl}
				>
					View News External Page <ExternalLinkIcon />
				</Button>
			) : null}
		</Box>
	);
};

export default NewsDetail;
