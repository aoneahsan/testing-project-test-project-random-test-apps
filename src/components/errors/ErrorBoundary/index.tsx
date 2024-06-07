import FullPageCenteredMessage from '@/components/FullPageCenteredMessage';
import { MESSAGES } from '@/utils/messages';
import React from 'react';

const ErrorBoundary: React.FC<{ message?: string }> = ({
	message = MESSAGES.general.failed,
}) => {
	return <FullPageCenteredMessage message={message} />;
};
export default ErrorBoundary;
