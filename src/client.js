import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'normalize.css';

import mobileNavigation from './js/components/MobileNavigation';
import enhanceWPElements from './js/components/EnhanceWPElements';
import showSampleWidgets from './js/sample';
import skipLinkFocusFix from './js/skipLinkFocusFix';
import transformURLsWebpackDevServer from './js/lib/transform-urls-wds';
import './client.styl';

skipLinkFocusFix();
mobileNavigation();
enhanceWPElements(['body .pagebuilder', 'article']);
showSampleWidgets({
  react: document.querySelector('.site-footer .react-widget-container'),
  vanilla: document.querySelector('.site-footer .vanilla-widgets'),
});
OfflinePluginRuntime.install();

if (module.hot) {
  transformURLsWebpackDevServer();
}
