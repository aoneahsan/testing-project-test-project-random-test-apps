import { useMediaQuery } from 'react-responsive';

export const useResponsiveScales = () => {
	const isLargeScreen = useMediaQuery({
		minWidth: '1900px',
	});
	const isDesktop = useMediaQuery({
		minWidth: '1350px',
	});
	const isTablet = useMediaQuery({
		minWidth: '1000px',
	});
	const isMobile = useMediaQuery({
		maxWidth: '700px',
	});

	return {
		isLargeScreen,
		isDesktop,
		isTablet,
		isMobile,
	};
};
