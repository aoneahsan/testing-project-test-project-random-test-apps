const _env = import.meta.env;
const isProduction = _env.PROD;
const isDevelopment = _env.DEV;

const apiRootUrl: string = isProduction
	? _env.VITE_BACKEND_URL_PROD
	: _env.VITE_BACKEND_URL_LOCAL;

if (!apiRootUrl || !apiRootUrl.length) {
	throw new Error('Backend Api Url is required');
}

const cryptoSecret =
	_env.VITE_CRYPTO_SECRET ??
	"default crypto secret, if needed we can throw error here as well if it's somewhat sensitive info for the frontend";

const ENVS = {
	apiRootUrl,
	isProduction,
	isDevelopment,
	cryptoSecret,
} as const;

export default ENVS;
