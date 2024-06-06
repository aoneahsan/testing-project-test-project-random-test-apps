import { ReactNode, useEffect } from 'react';
import { Network } from '@capacitor/network';
import { useRecoilState } from 'recoil';
import { networkConnectionRStateAtom } from '@/state/capacitorApis';
import FullPageLoader from '@/components/FullPageLoader';
import NetworkDisconnected from '@/components/errors/NetworkDisconnected';
import ErrorBoundary from '@/components/errors/ErrorBoundary';

const NetworkDetectHOC: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [networkConnectionRState, setNetworkConnectionRState] = useRecoilState(
		networkConnectionRStateAtom
	);

	useEffect(() => {
		void (async () => {
			try {
				const status = await Network.getStatus();
				setNetworkConnectionRState((oldState) => ({
					...oldState,
					processing: false,
					isConnected: status.connected,
					errorOcurred: false,
				}));
			} catch (error) {
				setNetworkConnectionRState((oldState) => ({
					...oldState,
					processing: false,
					errorOcurred: true,
				}));
			}

			try {
				Network.addListener('networkStatusChange', (status) => {
					setNetworkConnectionRState((oldState) => ({
						...oldState,
						processing: false,
						isConnected: status.connected,
						errorOcurred: false,
					}));
				});
			} catch (error) {
				setNetworkConnectionRState((oldState) => ({
					...oldState,
					processing: false,
					errorOcurred: true,
				}));
			}
		})();
	}, []);

	return networkConnectionRState.processing ? (
		<FullPageLoader />
	) : networkConnectionRState.errorOcurred ? (
		<ErrorBoundary />
	) : networkConnectionRState.isConnected ? (
		children
	) : (
		<NetworkDisconnected />
	);
};
export default NetworkDetectHOC;
