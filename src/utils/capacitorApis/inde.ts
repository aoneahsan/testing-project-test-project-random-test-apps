import { Dialog } from '@capacitor/dialog';

export const showDialog = async ({
	title = 'Dialog',
	message = 'This is a message',
}: {
	title?: string;
	message?: string;
}) => {
	await Dialog.alert({
		title,
		message,
	});
};
