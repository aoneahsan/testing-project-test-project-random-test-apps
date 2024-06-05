import ENVS from '@/utils/envKeys';
import { Axios } from 'axios';

const axiosInstance = new Axios({
	baseURL: ENVS.apiRootUrl,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});

export default axiosInstance;
