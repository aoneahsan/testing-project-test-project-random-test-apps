import { INewsItem } from '@/types/newsArticlesFrontend';
import { APP_ROUTES, routeParams } from '@/utils/constants';
import { BROWSER } from '@/utils/helpers/capacitorApis';
import { ExternalLinkIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Inset, Strong, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router';

interface INewsGridItemProps {
	newsItemData: INewsItem;
}

const NewsGridItem: React.FC<INewsGridItemProps> = ({ newsItemData }) => {
	const navigate = useNavigate();

	const openNewsExternalUrl = async () => {
		if (newsItemData.newsUrl) {
			await BROWSER.open(newsItemData.newsUrl);
		}
	};

	const navigateToNewsDetailPage = () => {
		if (newsItemData.id) {
			navigate(
				APP_ROUTES.newsDetail.replace(routeParams.newsId, newsItemData.id)
			);
		}
	};
	return (
		<Card
			size='2'
			className='h-full'
			asChild
		>
			<Flex direction='column'>
				<Box>
					<Inset
						clip='padding-box'
						side='top'
						pb='current'
					>
						<img
							src={newsItemData.imageUrl}
							alt={newsItemData.title}
							style={{
								display: 'block',
								objectFit: 'cover',
								width: '100%',
								height: 250,
								backgroundColor: 'var(--gray-5)',
							}}
						/>
					</Inset>
					<Text
						as='p'
						size='3'
						asChild
					>
						<Strong>{newsItemData.title}</Strong>
					</Text>
					<Text
						as='p'
						size='3'
					>
						{newsItemData.shortDescription}
					</Text>
				</Box>
				<Flex
					justify='between'
					align='end'
					mt='4'
					wrap='wrap'
				>
					<Button
						color='purple'
						size='1'
						className='pointer'
						onClick={openNewsExternalUrl}
					>
						Visit News Url <ExternalLinkIcon />
					</Button>
					<Button
						size='1'
						color='teal'
						className='pointer'
						onClick={navigateToNewsDetailPage}
					>
						View News <EyeOpenIcon />
					</Button>
				</Flex>
			</Flex>
		</Card>
	);
};

export default NewsGridItem;
