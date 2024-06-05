import axiosInstance from '@/axiosInstance';
import { ErrorCodeEnum, RequestTypeEnum } from '@/enums';
import {
	clearAuthDataFromLocalStorage,
	getAuthTokenFromLocalStorage,
} from '@/utils/helpers';
import { reportError } from '@/utils/reportError';
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useMutationRequest = (
	method: RequestTypeEnum = RequestTypeEnum.post,
	queriesToInvalidate?: QueryFilters
) => {
	const queryClient = useQueryClient();

	return useMutation({
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

				if (!authToken || authToken?.trim()?.length <= 0) {
					throw new Error('Invalid Auth Token');
				}

				headers.Authorization = `Bearer ${authToken}`;
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
		onError: async (_error) => {
			try {
				reportError(_error);

				const axiosErr = _error as AxiosError;
				const errorStatus = axiosErr.response?.status;
				if (errorStatus === ErrorCodeEnum.unAuthenticated) {
					await clearAuthDataFromLocalStorage();
				}
			} catch (error) {}
		},
	});
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
