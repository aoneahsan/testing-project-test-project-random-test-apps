import { useOneSignalZState } from '@app/state/oneSignal.state';
import ENVS from '@app/utils/envKeys';
import { useEffect } from 'react';
import OneSignalMobile from 'onesignal-cordova-plugin';
import { showDialog } from '@app/utils/capacitorApis/inde';

// without this in localhost, due to "React.StrictMode" i was getting error in console
let isInitialized = false;

const MobileOneSignal = () => {
	const oneSignalZState = useOneSignalZState();

	console.log({ oneSignalZState });

	useEffect(() => {
		if (!oneSignalZState.initialized && !isInitialized) {
			(async () => {
				isInitialized = true;
				OneSignalMobile.initialize(ENVS.oneSignalAppId);

				const requestPermission =
					await OneSignalMobile.Notifications.requestPermission(true);
				const permissionNative =
					await OneSignalMobile.Notifications.permissionNative();
				const getPermissionAsync =
					await OneSignalMobile.Notifications.getPermissionAsync();
				// OneSignalMobile.Notifications.registerForProvisionalAuthorization(
				// 	(response) => {
				// 		console.log({ m: 'registerForProvisionalAuthorization', response });
				// 	}
				// );

				console.log({
					requestPermission,
					permissionNative,
					getPermissionAsync,
				});

				oneSignalZState?.setIsInitialized();
			})();
		}
	}, []);

	return (
		<>
			<h1>MobileOneSignal page</h1>
			<p>{oneSignalZState.initialized ? 'on' : 'off'}</p>
			<button
				onClick={() => {
					OneSignalMobile.setConsentRequired(false);
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
					OneSignalMobile.setConsentRequired(true);
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
					OneSignalMobile.setConsentGiven(false);
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
					OneSignalMobile.setConsentGiven(true);
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
					OneSignalMobile.login('aoneahsan@gmail.com');
					showDialog({
						title: 'Login',
						message: 'Login with aoneahsan@gmail.com',
					});
				}}
			>
				login('aoneahsan@gmail.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignalMobile.login('ahsan@perkforce.com');
					showDialog({
						title: 'Login',
						message: 'Login with ahsan@perkforce.com',
					});
				}}
			>
				login('ahsan@perkforce.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignalMobile.login('ahsan@zaions.com');
					showDialog({
						title: 'Login',
						message: 'Login with ahsan@zaions.com',
					});
				}}
			>
				login('ahsan@zaions.com')
			</button>
			<br />
			<button
				onClick={() => {
					OneSignalMobile.Notifications.requestPermission();
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
					OneSignalMobile.logout();
					showDialog({
						title: 'Logout',
						message: 'Logout',
					});
				}}
			>
				one signal logout
			</button>
			<br />
			<button
				onClick={() => {
					OneSignalMobile.User.pushSubscription.optIn();
					showDialog({
						title: 'User.pushSubscription.optIn',
						message: 'User.pushSubscription.optIn',
					});
				}}
			>
				one signal User.pushSubscription.optIn
			</button>
			<br />
			<button
				onClick={() => {
					OneSignalMobile.User.pushSubscription.optOut();
					showDialog({
						title: 'User.pushSubscription.optOut',
						message: 'User.pushSubscription.optOut',
					});
				}}
			>
				one signal User.pushSubscription.optOut
			</button>
			<br />
			<button
				onClick={() => {
					console.log({ OneSignalMobile });
					showDialog({
						title: 'OneSignalMobile',
						message: 'OneSignalMobile log data',
					});
				}}
			>
				one signal log data
			</button>
			<br />
			<button
				onClick={() => {
					OneSignalMobile.User.addEmail('email-added@zaions.com');
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
					OneSignalMobile.User.addSms('+923046619706');
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
					OneSignalMobile.User.addAliases({
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
					OneSignalMobile.User.addTags({
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
		</>
	);
};

export default MobileOneSignal;
