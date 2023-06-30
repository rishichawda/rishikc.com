import "@fontsource/open-sans";
import 'normalize.css';
import './src/stylesheets/global.scss';
import ReactDOM from "react-dom/client"

// Reload the page when updates are found so that new changes are
// visible without manual page refresh.
export const onServiceWorkerUpdateReady = () => window.location.reload();

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}
