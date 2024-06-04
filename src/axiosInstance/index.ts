import ENVS from '@/utils/envKeys';
import { Axios } from 'axios';

const axiosInstance = new Axios({
	baseURL: ENVS.apiRootUrl,
});

export default axiosInstance;
