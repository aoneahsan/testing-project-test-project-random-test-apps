const _env = import.meta.env;

const ENVS = {
	oneSignalAppId: _env.VITE_ONE_SIGNAL_APP_ID,
	oneSignalAuthKey: _env.VITE_ONE_SIGNAL_AUTH_KEY,
};
export default ENVS;
