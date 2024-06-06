import { ReactToastifyTypeEnum } from '@/enums';
import { MESSAGES } from '@/utils/messages';
import { ToastContent, ToastOptions, toast } from 'react-toastify';

export const showNotification = (
	content: ToastContent,
	type: ReactToastifyTypeEnum = ReactToastifyTypeEnum.success,
	options?: ToastOptions
) => {
	toast(content, {
		...options,
		position: options?.position ?? 'top-right',
		type: type,
	});
};

export const showSuccessNotification = (
	message: ToastContent = MESSAGES.general.success,
	options?: ToastOptions
) => {
	showNotification(message, ReactToastifyTypeEnum.success, options);
};

export const showErrorNotification = (
	message: ToastContent = MESSAGES.general.failed,
	options?: ToastOptions
) => {
	showNotification(message, ReactToastifyTypeEnum.error, options);
};
