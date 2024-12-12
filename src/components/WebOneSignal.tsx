import { useOneSignalZState } from '@app/state/oneSignal.state';
import ENVS from '@app/utils/envKeys';
import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

// without this in localhost, due to "React.StrictMode" i was getting error in console
let isInitialized = false;

const WebOneSignal = () => {
	const oneSignalZState = useOneSignalZState();

	console.log({ oneSignalZState });

	useEffect(() => {
		if (!oneSignalZState.initialized && !isInitialized) {
			(async () => {
				isInitialized = true;
				const result = await OneSignal.init({
					appId: ENVS.oneSignalAppId,
					allowLocalhostAsSecureOrigin: true,
					autoRegister: false,
					autoResubscribe: true,
					notifyButton: {
						enabled: true,
					},
					path: '/',
					serviceWorkerPath:
						'push-notifications/one-signal/OneSignalSDKWorker.js',
					serviceWorkerParam: {
						scope: '/push-notifications/one-signal/',
					}, // Changed scope
					// Enable for debugging
					enableLogs: true,
				});

				console.log({ result });

				oneSignalZState?.setIsInitialized();
			})();
		}
	}, []);

	return (
		<>
			<h1>WebOneSignal page</h1>
			<p>{oneSignalZState.initialized ? 'on' : 'off'}</p>
			<button
				onClick={() => {
					OneSignal.setConsentRequired(false);
				}}
			>
				set consent required to false
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.setConsentRequired(true);
				}}
			>
				set consent required to true
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.setConsentGiven(false);
				}}
			>
				set consent given to false
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.setConsentGiven(true);
				}}
			>
				set consent given to true
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.login('aoneahsan@gmail.com');
				}}
			>
				login('aoneahsan@gmail.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.login('ahsan@perkforce.com');
				}}
			>
				login('ahsan@perkforce.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.login('ahsan@zaions.com');
				}}
			>
				login('ahsan@zaions.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.Notifications.requestPermission();
				}}
			>
				one signal requestPermission
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.Slidedown.promptPush();
				}}
			>
				one signal Slidedown.promptPush
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.logout();
				}}
			>
				one signal logout
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.PushSubscription.optIn();
				}}
			>
				one signal User.PushSubscription.optIn
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.PushSubscription.optOut();
				}}
			>
				one signal User.PushSubscription.optOut
			</button>
			<br />
			<button
				onClick={() => {
					console.log({ OneSignal });
				}}
			>
				one signal log data
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.addEmail('email-added@zaions.com');
				}}
			>
				one signal - User.addEmail
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.addSms('+923046619706');
				}}
			>
				one signal - User.addSms
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.addAliases({
						googleId: 'googleId',
						facebookId: 'facebookId',
						linkedinId: 'linkedinId',
					});
				}}
			>
				one signal - User.addAliases
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.addTags({
						tag1: 'tag1',
						tag2: 'tag2',
						tag3: 'tag3',
					});
				}}
			>
				one signal - User.addTags
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.Notifications.setDefaultTitle(
						'Notifications.setDefaultTitle'
					);
				}}
			>
				one signal - Notifications.setDefaultTitle
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.Notifications.setDefaultUrl('Notifications.setDefaultUrl');
				}}
			>
				one signal - Notifications.setDefaultUrl
			</button>
			<br />
		</>
	);
};

export default WebOneSignal;
