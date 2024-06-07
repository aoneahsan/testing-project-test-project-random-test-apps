import { Flex, Spinner } from '@radix-ui/themes';
import React from 'react';
import './styles.css';

const FullPageLoader: React.FC = () => {
	return (
		<Flex
			justify='center'
			align='center'
			height='100%'
			minHeight='100vh'
		>
			<Spinner className='spinner' size='3' />
		</Flex>
	);
};
export default FullPageLoader;
