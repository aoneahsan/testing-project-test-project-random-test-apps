import { MESSAGES } from '@/utils/messages';
import { Heading } from '@radix-ui/themes';
import React from 'react';

const ErrorBoundary: React.FC<{ message?: string }> = ({
	message = MESSAGES.general.failed,
}) => {
	return <Heading>{message}</Heading>;
};
export default ErrorBoundary;
