/**
 * This file is the central point for all custom admin side JavaScript and CSS.
 * Keep this file clean and write your code as modules.
 * dist/admin.js & dist/admin.css are built using this file.
 */
import 'regenerator-runtime/runtime';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import polyfiller from 'lib/polyfiller';
import enhanceColorField from 'admin/enhanceColorField';
import translationLinks from 'admin/translationLinks';
import './admin.styl';

polyfiller({
  src: window.theme.assets.polyfill,
  condition: window.Promise && window.fetch,
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  enhanceColorField();
  translationLinks();
  OfflinePluginRuntime.install();
});
