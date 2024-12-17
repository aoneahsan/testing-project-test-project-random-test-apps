import MobileOneSignal from '@app/components/MobileOneSignal';
import WebOneSignal from '@app/components/WebOneSignal';
import ENVS from '@app/utils/envKeys';
import { Capacitor } from '@capacitor/core';

const isWeb = Capacitor.getPlatform() === 'web';

console.log({ ENVS });

const Home = () => {
	return <>{isWeb ? <WebOneSignal /> : <MobileOneSignal />}</>;
};

export default Home;
