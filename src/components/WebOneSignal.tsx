import { useOneSignalZState } from '@app/state/oneSignal.state';
import { showDialog } from '@app/utils/capacitorApis/inde';
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

				OneSignal.Slidedown.addEventListener('slidedownShown', () => {
					console.log('Slidedown Shown');
				});

				OneSignal.Notifications.addEventListener(
					'foregroundWillDisplay',
					(event) => {
						console.log('OneSignal foregroundWillDisplay:', event);
					}
				);
				OneSignal.Notifications.addEventListener('click', (event) => {
					console.log('OneSignal click:', event);
				});
				OneSignal.Notifications.addEventListener('dismiss', (event) => {
					console.log('OneSignal dismiss:', event);
				});
				OneSignal.Notifications.addEventListener(
					'permissionChange',
					(event) => {
						console.log('OneSignal permissionChange:', event);
					}
				);
				OneSignal.Notifications.addEventListener(
					'permissionPromptDisplay',
					(event) => {
						console.log('OneSignal permissionPromptDisplay:', event);
					}
				);

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
					showDialog({
						title: 'Consent Required',
						message: 'Consent Required set to false',
					});
				}}
			>
				set consent required to false
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.setConsentRequired(true);
					showDialog({
						title: 'Consent Required',
						message: 'Consent Required set to true',
					});
				}}
			>
				set consent required to true
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.setConsentGiven(false);
					showDialog({
						title: 'Consent Given',
						message: 'Consent Given set to false',
					});
				}}
			>
				set consent given to false
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.setConsentGiven(true);
					showDialog({
						title: 'Consent Given',
						message: 'Consent Given set to true',
					});
				}}
			>
				set consent given to true
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.login('aoneahsan@gmail.com');
					showDialog({
						title: 'Login',
						message: 'Logged in as aoneahsan@gmail.com',
					});
				}}
			>
				login('aoneahsan@gmail.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.login('ahsan@perkforce.com');
					showDialog({
						title: 'Login',
						message: 'Logged in as ahsan@perkforce.com',
					});
				}}
			>
				login('ahsan@perkforce.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.login('ahsan@zaions.com');
					showDialog({
						title: 'Login',
						message: 'Logged in as ahsan@zaions.com',
					});
				}}
			>
				login('ahsan@zaions.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.Notifications.requestPermission();
					showDialog({
						title: 'Request Permission',
						message: 'Request Permission',
					});
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
					showDialog({
						title: 'Logout',
						message: 'Logged out',
					});
				}}
			>
				one signal logout
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.PushSubscription.optIn();
					showDialog({
						title: 'User.PushSubscription.optIn',
						message: 'User.PushSubscription.optIn',
					});
				}}
			>
				one signal User.PushSubscription.optIn
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.PushSubscription.optOut();
					showDialog({
						title: 'User.PushSubscription.optOut',
						message: 'User.PushSubscription.optOut',
					});
				}}
			>
				one signal User.PushSubscription.optOut
			</button>
			<br />
			<button
				onClick={() => {
					console.log({ OneSignal });
					showDialog({
						title: 'OneSignal',
						message: 'OneSignal',
					});
				}}
			>
				one signal log data
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.addEmail('email-added@zaions.com');
					showDialog({
						title: 'User.addEmail',
						message: 'User.addEmail',
					});
				}}
			>
				one signal - User.addEmail
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.User.addSms('+923046619706');
					showDialog({
						title: 'User.addSms',
						message: 'User.addSms',
					});
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
					showDialog({
						title: 'User.addAliases',
						message: 'User.addAliases',
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
					showDialog({
						title: 'User.addTags',
						message: 'User.addTags',
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
					showDialog({
						title: 'Notifications.setDefaultTitle',
						message: 'Notifications.setDefaultTitle',
					});
				}}
			>
				one signal - Notifications.setDefaultTitle
			</button>
			<br />
			<button
				onClick={() => {
					OneSignal.Notifications.setDefaultUrl('Notifications.setDefaultUrl');
					showDialog({
						title: 'Notifications.setDefaultUrl',
						message: 'Notifications.setDefaultUrl',
					});
				}}
			>
				one signal - Notifications.setDefaultUrl
			</button>
			<br />
		</>
	);
};

export default WebOneSignal;
