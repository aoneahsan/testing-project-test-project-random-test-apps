import { Preferences } from '@capacitor/preferences';
import { AES, enc } from 'crypto-js';
import ENVS from '../envKeys';
import { APP_ROUTES, LOCALSTORAGE_KEYS } from '../constants';
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
	if (userData) {
		await STORAGE.set(LOCALSTORAGE_KEYS.userData, userData);
	}

	if (authToken) {
		await STORAGE.set(LOCALSTORAGE_KEYS.userAuthToken, authToken);
	}
};

export const getAuthTokenFromLocalStorage = async () => {
	return await STORAGE.get<string>(LOCALSTORAGE_KEYS.userAuthToken);
};

export const getAuthDataFromLocalStorage = async () => {
	try {
		const userData = await STORAGE.get<IUser>(LOCALSTORAGE_KEYS.userData);
		const authToken = await getAuthTokenFromLocalStorage();

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

// routesMatch will contain other info as well, but for now, i'm only interested in "pathname" value, as we do not have 2nd level nested routes in our app
export const formatRoutesMatchResult = (routesMatch: string[] | undefined) => {
	if (routesMatch && routesMatch.length > 0) {
		const isLoginRoute = routesMatch[0] === APP_ROUTES.login;
		const isRegisterRoute = routesMatch[0] === APP_ROUTES.register;

		const isHomeRoute = routesMatch[0] === APP_ROUTES.home;
		const isUserFeedRoute = routesMatch[0] === APP_ROUTES.userFeed;
		const isMyAccountRoute = routesMatch[0] === APP_ROUTES.myAccount;

		return {
			isLoginRoute,
			isRegisterRoute,
			isHomeRoute,
			isUserFeedRoute,
			isMyAccountRoute,
		};
	} else {
		return {};
	}
};

export const truncateText = (str?: string, length: number = 300): string => {
	if (str && str.length <= length) {
		return str;
	} else {
		return str ? str?.substring(0, length) + '...' : '';
	}
};

export const getRandomId = (): string => {
	return (
		new Date().getTime() + Math.round(Math.random() * 1000000)
	).toString();
};
