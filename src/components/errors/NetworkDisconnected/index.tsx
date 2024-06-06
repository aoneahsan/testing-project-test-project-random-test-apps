import { MESSAGES } from '@/utils/messages';
import { Heading } from '@radix-ui/themes';
import React from 'react';

const NetworkDisconnected: React.FC<{ message?: string }> = ({
	message = MESSAGES.network.disconnected,
}) => {
	return <Heading>{message}</Heading>;
};
export default NetworkDisconnected;
