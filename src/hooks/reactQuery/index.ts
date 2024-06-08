import axiosInstance from '@/axiosInstance';
import { RequestTypeEnum } from '@/enums';
import { ResponseStatusEnum } from '@/enums/backendApi';
import { ReactQueryKeyEnum } from '@/enums/reactQuery';
import { userDataRStateAtom } from '@/state/userState';
import { reactQueryOptions } from '@/utils/constants/reactQuery';
import {
	clearAuthDataFromLocalStorage,
	getAuthTokenFromLocalStorage,
} from '@/utils/helpers';
import { getReactQueryKey } from '@/utils/helpers/reactQuery';
import { MESSAGES } from '@/utils/messages';
import { reportError } from '@/utils/reportError';
import {
	QueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useMutationRequest = (
	method: RequestTypeEnum = RequestTypeEnum.post,
	queriesToInvalidate?: QueryFilters
) => {
	const queryClient = useQueryClient();
	const setUserDataRState = useSetRecoilState(userDataRStateAtom);

	const _mutation = useMutation({
		mutationFn: async ({
			url,
			data,
			isAuthenticatedRequest,
		}: {
			url: string;
			data?: string | FormData;
			isAuthenticatedRequest?: boolean;
		}) => {
			let authToken: string | null = null;
			const headers: Record<string, string> = {};

			if (isAuthenticatedRequest) {
				authToken = await getAuthTokenFromLocalStorage();

				if (authToken && authToken?.trim()?.length > 0) {
					headers.Authorization = `Bearer ${authToken}`;
				}
			}

			if (url) {
				if (method === RequestTypeEnum.post) {
					return await axiosInstance.post(url, data, {
						headers,
					});
				} else if (method === RequestTypeEnum.put) {
					return await axiosInstance.put(url, data, {
						headers,
					});
				} else if (method === RequestTypeEnum.delete) {
					return await axiosInstance.delete(url, {
						headers,
					});
				} else {
					throw new Error(
						'Only these three type of mutation requests are allowed, post, put and delete.'
					);
				}
			} else {
				throw new Error('No API Url Provided');
			}
		},
		onMutate: async () => {
			if (queriesToInvalidate) {
				await queryClient.cancelQueries(queriesToInvalidate);
			}
		},
		onSuccess: async (_data) => {
			if (queriesToInvalidate) {
				await queryClient.invalidateQueries(queriesToInvalidate);
			}
		},
		throwOnError: true,
	});

	const _status = _mutation.data?.status;
	const _error = _mutation.error;

	checkIfUserIsUnAuthenticated(_status, _error, setUserDataRState);

	return _mutation;
};

export const usePostRequest = (queriesToInvalidate?: QueryFilters) => {
	return useMutationRequest(RequestTypeEnum.post, queriesToInvalidate);
};

export const usePutRequest = (queriesToInvalidate?: QueryFilters) => {
	return useMutationRequest(RequestTypeEnum.put, queriesToInvalidate);
};

export const useDeleteRequest = (queriesToInvalidate?: QueryFilters) => {
	return useMutationRequest(RequestTypeEnum.delete, queriesToInvalidate);
};

export const useGetRequest = (
	url: string,
	_queryKey: ReactQueryKeyEnum,
	isAuthenticatedRequest: boolean = true,
	staleTime: number = reactQueryOptions.staleTime.fiveMinutes
) => {
	const [userDataRState, setUserDataRState] =
		useRecoilState(userDataRStateAtom);

	const queryKey = getReactQueryKey(_queryKey, userDataRState);

	const _query = useQuery({
		queryKey,
		queryFn: async () => {
			let authToken: string | null = null;
			const headers: Record<string, string> = {};

			if (isAuthenticatedRequest) {
				authToken = await getAuthTokenFromLocalStorage();

				if (!authToken || authToken?.trim()?.length <= 0) {
					return null;
				}

				headers.Authorization = `Bearer ${authToken}`;
			}

			if (url) {
				return await axiosInstance.get(url, {
					headers,
				});
			} else {
				throw new Error('No API Url Provided');
			}
		},
		refetchOnReconnect: true,
		refetchOnWindowFocus: false,
		throwOnError: true,
		retry: 2,
		staleTime: staleTime,
	});

	const _status = _query.data?.status;
	const _error = _query.error;

	if (_status) {
		checkIfUserIsUnAuthenticated(_status, _error, setUserDataRState);
	}

	return _query;
};

const checkIfUserIsUnAuthenticated = (
	status: number | undefined,
	error: Error | null,
	setUserDataRState: (val: null) => void
) => {
	if (status === ResponseStatusEnum.unAuthenticated) {
		void (async () => {
			reportError(error ?? MESSAGES.errors.unAuthenticated);

			await clearAuthDataAndAuthState(setUserDataRState);
		})();
	}
};

const clearAuthDataAndAuthState = async (
	setUserDataRState: (val: null) => void
) => {
	await clearAuthDataFromLocalStorage();

	setUserDataRState(null);
};
