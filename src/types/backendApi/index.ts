import { ResponseCodeEnum, ResponseStatusEnum } from '@/enums/backendApi';

interface IApiResponseResult<T> {
	data?: T;
	authToken?: string;
	dataList?: T;
}

export interface IApiResponse<T> {
	errors: Record<string, string> | null;
	result: IApiResponseResult<T> | null;
	message: string;
	success: boolean;
	status: ResponseStatusEnum;
	code: ResponseCodeEnum;
}
