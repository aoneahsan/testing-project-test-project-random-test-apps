import { Box, Button, Flex, Link, Text } from '@radix-ui/themes';
import './styles.css';
import { developerDetails } from '@/utils/constants';
import { LinkTarget } from '@/enums';
import { useMemo } from 'react';

const Footer: React.FC = () => {
	const links = useMemo(() => {
		return [
			{
				url: developerDetails.linkedinProfile,
				label: 'Linkedin Profile',
			},
			{
				url: developerDetails.githubProfile,
				label: 'Github Profile',
			},
			{
				url: developerDetails.updatedResume,
				label: 'Updated Resume',
			},
			{
				url: developerDetails.updatedCV,
				label: 'Updated CV',
			},
		];
	}, []);
	return (
		<>
			<Box
				className='footer-con'
				py='2'
			>
				<Box className='footer-content'>
					<Flex
						justify='between'
						align='center'
					>
						<Text>All rights reserved © {new Date().getFullYear()}</Text>
						<Text>
							Developed by{' '}
							<Link
								href={developerDetails.portfolioWebsite}
								target={LinkTarget.blank}
							>
								Ahsan Mahmood
							</Link>{' '}
							with ♡
						</Text>
					</Flex>
					<Flex
						justify='center'
						align='center'
					>
						{links.map((el) => {
							return (
								<Button
									size='1'
									asChild
									mr='2'
								>
									<Link
										href={el.url}
										target={LinkTarget.blank}
									>
										{el.label}
									</Link>
								</Button>
							);
						})}
					</Flex>
				</Box>
			</Box>
		</>
	);
};
export default Footer;
