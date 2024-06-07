import FullPageCenteredMessage from '@/components/FullPageCenteredMessage';
import { MESSAGES } from '@/utils/messages';
import React from 'react';

const NetworkDisconnected: React.FC<{ message?: string }> = ({
	message = MESSAGES.network.disconnected,
}) => {
	return <FullPageCenteredMessage message={message} />;
};
export default NetworkDisconnected;
