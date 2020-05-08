/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// Detect service worker updates and reload page.
require('typeface-roboto')
require('./src/styles/index.css')
require('./src/templates/night-owl.min.css')
require('./node_modules/normalize.css/normalize.css')

// Reference : https://github.com/gatsbyjs/gatsby/issues/9087#issuecomment-459105021
export const onServiceWorkerUpdateReady = () => window.location.reload(true)
