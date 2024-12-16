import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.zaions.onesignaltestapp1',
	appName: 'perkforce-one-signal',
	webDir: 'dist',
	ios: {
		handleApplicationNotifications: false,
	},
};

export default config;
