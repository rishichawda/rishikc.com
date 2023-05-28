import 'normalize.css';
import "@fontsource/open-sans";
import './src/stylesheets/global.scss';
import './src/stylesheets/scales/space.scss';
import './src/stylesheets/scales/type.scss';

// Reload the page when updates are found so that new changes are
// visible without manual page refresh.
export const onServiceWorkerUpdateReady = () => window.location.reload();
