import { Theme } from '@radix-ui/themes';

// Import Radix UI CSS
import '@radix-ui/themes/styles.css';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/AppRouter';

const AppEntryPoint: React.FC = () => (
	<>
		<Theme
		// accentColor='orange'
		// grayColor='sand'
		// radius='full'
		// scaling='110%'
		// appearance='dark'
		>
			<RouterProvider router={appRouter} />
			{/* <ThemePanel /> */}
		</Theme>
	</>
);

export default AppEntryPoint;
