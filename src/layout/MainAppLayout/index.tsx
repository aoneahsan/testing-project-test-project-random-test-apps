import AuthenticationHOC from '@/HOC/AuthenticationHOC';
import NetworkDetectHOC from '@/HOC/NetworkDetectHOC';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Box } from '@radix-ui/themes';
import { Outlet } from 'react-router';

const MainAppLayout: React.FC = () => {
	return (
		<>
			<NetworkDetectHOC>
				<AuthenticationHOC>
					<Header />
					<Box minHeight='82vh'>
						<Outlet />
					</Box>
					<Footer />
				</AuthenticationHOC>
			</NetworkDetectHOC>
		</>
	);
};

export default MainAppLayout;
