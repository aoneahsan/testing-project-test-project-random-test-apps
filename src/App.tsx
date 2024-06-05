import AppEntryPoint from '@/AppEntryPoint';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import './index.css';

defineCustomElements(window);

const App: React.FC = () => <AppEntryPoint />;

export default App;
