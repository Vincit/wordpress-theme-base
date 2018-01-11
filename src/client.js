/**
 * This file is the central point for all custom client side JavaScript and CSS.
 * Keep this file clean and write your code as modules.
 * dist/client.js & dist/client.css are built using this file.
 * webpack-dev-server builds this file in development and provides
 * hot reload for JavaScript and (built) CSS.
 */
import 'regenerator-runtime/runtime';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'normalize.css';

import polyfiller from './js/lib/polyfiller';
import enhanceWPElements from './js/lib/enhance-wp-elements';
import skipLinkFocusFix from './js/lib/skip-link-focus-fix';
import transformURLsWebpackDevServer from './js/lib/transform-urls-wds';

import mobileNavigation from './js/components/MobileNavigation';
import renderSampleWidgetsTo from './js/components/SampleWidgets/';

// import colors from './colors.json';
// import mediaQueries from './media-queries.json';
import './client.styl';

polyfiller({
  src: `${window.theme.path}/dist/polyfill.js`,
  condition: window.Promise && window.fetch,
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  skipLinkFocusFix();
  enhanceWPElements(['body .pagebuilder', 'article']);

  mobileNavigation();
  renderSampleWidgetsTo({
    react: document.querySelector('.sample-widgets .react'),
    vanilla: document.querySelector('.sample-widgets .vanilla'),
  });

  if (module.hot) {
    transformURLsWebpackDevServer();
  }
  OfflinePluginRuntime.install();
});
