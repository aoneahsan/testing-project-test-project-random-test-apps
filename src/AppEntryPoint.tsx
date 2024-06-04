import { Theme } from '@radix-ui/themes';

// Import Radix UI CSS
import '@radix-ui/themes/styles.css';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/AppRouter';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AppEntryPoint: React.FC = () => (
	<>
		<Theme>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					
					<RouterProvider router={appRouter} />
				</QueryClientProvider>
			</RecoilRoot>
			{/* <ThemePanel /> */}
		</Theme>
	</>
);

export default AppEntryPoint;
