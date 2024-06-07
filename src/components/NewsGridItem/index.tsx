import { INewsItem } from '@/types/newsArticlesFrontend';
import { Box, Card, Inset, Strong, Text } from '@radix-ui/themes';

interface INewsGridItemProps {
	newsItemData: INewsItem;
}

const NewsGridItem: React.FC<INewsGridItemProps> = ({ newsItemData }) => {
	return (
		<Box maxWidth='240px'>
			<Card size='2'>
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
							height: 140,
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
			</Card>
		</Box>
	);
};

export default NewsGridItem;
