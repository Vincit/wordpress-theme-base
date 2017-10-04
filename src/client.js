import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'normalize.css';

import mobileNavigation from './js/components/MobileNavigation';
import enhanceWPElements from './js/components/EnhanceWPElements';
import showSampleWidgets from './js/sample';
import skipLinkFocusFix from './js/skipLinkFocusFix';

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
  // Running from webpack-dev-server. Transform all links so they keep working.
  Array.from(document.querySelectorAll('a')).forEach((a) => {
    const siteurl = window.theme.siteurl;
    const url = window.location.origin;

    if (a.href) {
      a.href = a.href.replace(siteurl, url);
    }
  });
}
