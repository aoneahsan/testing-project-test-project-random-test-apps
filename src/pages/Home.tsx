import MobileOneSignal from '@app/components/MobileOneSignal';
import WebOneSignal from '@app/components/WebOneSignal';
import ENVS from '@app/utils/envKeys';
import { Capacitor } from '@capacitor/core';

const isWeb = Capacitor.getPlatform() === 'web';

console.log({ ENVS });

const Home = () => {
	return <>{isWeb ? <WebOneSignal /> : <MobileOneSignal />}</>;
	// return <>{isWeb ? <WebOneSignal /> : <h1>mobile component here</h1>}</>;
};

export default Home;
