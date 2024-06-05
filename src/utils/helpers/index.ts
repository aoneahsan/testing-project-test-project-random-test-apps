import { Preferences } from '@capacitor/preferences';
import { AES, enc } from 'crypto-js';
import ENVS from '../envKeys';
import { LOCALSTORAGE_KEYS } from '../constants';
import { IUser } from '@/types/userData';

export const encryptData = (val: unknown): string | null => {
	try {
		return AES.encrypt(JSON.stringify(val), ENVS.cryptoSecret).toString();
	} catch (error) {
		return null;
	}
};
export const decryptData = <T>(val: string): T | null => {
	try {
		return JSON.parse(
			AES.decrypt(val, ENVS.cryptoSecret).toString(enc.Utf8)
		) as T;
	} catch (error) {
		return null;
	}
};

export const STORAGE = {
	get: async <T>(key: string): Promise<T | null> => {
		try {
			const _val = (await Preferences.get({ key })).value;

			if (_val) {
				return decryptData<T>(_val);
			}
			return null;
		} catch (error) {
			return null;
		}
	},
	set: async (key: string, data: unknown): Promise<void> => {
		const _val = encryptData(data);
		if (_val) {
			await Preferences.set({ key, value: _val });
		} else {
			throw new Error(
				'Something Went wrong while trying to set data in localstorage.'
			);
		}
	},
	remove: async (key: string): Promise<void> => {
		await Preferences.remove({ key });
	},
	clear: async (): Promise<void> => {
		await Preferences.clear();
	},
};

export const clearAuthDataFromLocalStorage = async (): Promise<void> => {
	try {
		// clear whole localstorage data
		// await STORAGE.clear();

		// if you do not want to clear everything from localstorage you can be specific
		await Promise.all([
			STORAGE.remove(LOCALSTORAGE_KEYS.userData),
			STORAGE.remove(LOCALSTORAGE_KEYS.userAuthToken),
		]);
	} catch (error) {}
};

export const setAuthDataInLocalStorage = async ({
	userData,
	authToken,
}: {
	userData?: IUser;
	authToken?: string;
}): Promise<void> => {
	try {
		if (userData) {
			await STORAGE.set(LOCALSTORAGE_KEYS.userData, userData);
		}

		if (authToken) {
			await STORAGE.set(LOCALSTORAGE_KEYS.userAuthToken, userData);
		}
	} catch (error) {}
};

export const getAuthDataFromLocalStorage = async () => {
	try {
		const userData = await STORAGE.get<IUser>(LOCALSTORAGE_KEYS.userData);
		const authToken = await STORAGE.get<string>(
			LOCALSTORAGE_KEYS.userAuthToken
		);

		return { userData, authToken };
	} catch (error) {
		return null;
	}
};

export const formatFormErrorsFromApiResponse = (
	errors: Record<string, string> | null
) => {
	const _errors: Record<string, string> = {};
	if (errors !== null) {
		Object.keys(errors).forEach((_key) => {
			const message = (errors ?? {})[_key];
			if (message) {
				_errors[_key] = message;
			}
		});
		return _errors;
	} else {
		return null;
	}
};
