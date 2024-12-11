import { useOneSignalZState } from '@app/state/oneSignal.state';
import ENVS from '@app/utils/envKeys';
import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

console.log({ ENVS });

// without this in localhost, due to "React.StrictMode" i was getting error in console
let isInitialized = false;

const Home = () => {
	const oneSignalZState = useOneSignalZState();

	console.log({ oneSignalZState });

	useEffect(() => {
		if (!oneSignalZState.initialized && !isInitialized) {
			(async () => {
				isInitialized = true;
				const result = await OneSignal.init({
					appId: ENVS.oneSignalAppId,
					allowLocalhostAsSecureOrigin: true,
					autoRegister: true,
					autoResubscribe: true,
					notifyButton: {
						enabled: true,
					},
					// serviceWorkerPath: '/push-notifications/one-signal',
					path: 'push-notifications/one-signal/',
				});

				console.log({ result });

				oneSignalZState?.setIsInitialized();
			})();
		}
	}, []);

	return (
		<>
			<h1>home page</h1>

			<p>{oneSignalZState.initialized ? 'on' : 'off'}</p>

			<button
				onClick={() => {
					OneSignal.setConsentRequired(false);
				}}
			>
				set consent required to false
			</button>
			<button
				onClick={() => {
					OneSignal.setConsentRequired(true);
				}}
			>
				set consent required to true
			</button>
			<button
				onClick={() => {
					OneSignal.setConsentGiven(false);
				}}
			>
				set consent given to false
			</button>
			<button
				onClick={() => {
					OneSignal.setConsentGiven(true);
				}}
			>
				set consent given to true
			</button>
			<button
				onClick={() => {
					OneSignal.setConsentRequired(true);
				}}
			>
				add external id
			</button>
		</>
	);
};

export default Home;
