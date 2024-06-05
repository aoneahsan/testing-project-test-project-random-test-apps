import { Theme } from '@radix-ui/themes';

// Import Radix UI CSS
import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/AppRouter';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';

const queryClient = new QueryClient();

const AppEntryPoint: React.FC = () => (
	<>
		<Theme>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={appRouter} />

					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</RecoilRoot>
			{/* <ThemePanel /> */}

			<ToastContainer />
		</Theme>
	</>
);

export default AppEntryPoint;
