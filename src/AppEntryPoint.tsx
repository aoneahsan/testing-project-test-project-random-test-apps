import { Theme } from '@radix-ui/themes';
import Home from './pages/Home';

// Import Radix UI CSS
import '@radix-ui/themes/styles.css';

const AppEntryPoint: React.FC = () => (
	<>
		<Theme
		// accentColor='orange'
		// grayColor='sand'
		// radius='full'
		// scaling='110%'
		// appearance='dark'
		>
			<Home />
			{/* <ThemePanel /> */}
		</Theme>
	</>
);

export default AppEntryPoint;
