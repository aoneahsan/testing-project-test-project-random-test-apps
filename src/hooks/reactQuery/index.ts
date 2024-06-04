import axiosInstance from '@/axiosInstance';
import { ErrorCodeEnum } from '@/enums';
import { clearAuthDataFromLocalStorage } from '@/utils/helpers';
import { reportError } from '@/utils/reportError';
import {
	QueryFilters,
	UseMutationResult,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePostRequest = <T>({
	url,
	data,
	queriesToInvalidate,
}: {
	url: string;
	data: string;
	queriesToInvalidate?: QueryFilters;
}): UseMutationResult<T | void> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			return await axiosInstance.post(url, data);
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
