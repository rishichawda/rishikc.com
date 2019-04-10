/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// Detect service worker updates and reload page.
require('./src/globals/fonts.scss')

exports.onServiceWorkerUpdateFound = () => window.location.reload(true);
