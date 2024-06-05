import { ToastDurationEnum, ToastPositionEnum } from '@/enums/capacitorApis';
import { MESSAGES } from '@/utils/messages';
import { Toast } from '@capacitor/toast';

export const showToast = async (
	message: string = MESSAGES.general.success,
	duration: ToastDurationEnum = ToastDurationEnum.long,
	position: ToastPositionEnum = ToastPositionEnum.bottom
) => {
	await Toast.show({
		text: message,
		position,
		duration,
	});
};
