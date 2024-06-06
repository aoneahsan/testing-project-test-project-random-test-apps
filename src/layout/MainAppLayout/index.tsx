import AuthenticationHOC from '@/HOC/AuthenticationHOC';
import NetworkDetectHOC from '@/HOC/NetworkDetectHOC';
import { Heading } from '@radix-ui/themes';
import { Outlet } from 'react-router';

const MainAppLayout: React.FC = () => {
	return (
		<>
			<NetworkDetectHOC>
				<AuthenticationHOC>
					<Heading>Header component here</Heading>
					<Outlet />
					<Heading>footer component here</Heading>
				</AuthenticationHOC>
			</NetworkDetectHOC>
		</>
	);
};

export default MainAppLayout;
