import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'normalize.css';

import mobileNavigation from './js/components/MobileNavigation';
import enhanceWPElements from './js/components/EnhanceWPElements';
import showSampleWidgets from './js/sample';
import skipLinkFocusFix from './js/skip-link-focus-fix';

import './client.styl';

skipLinkFocusFix();
mobileNavigation();
enhanceWPElements(['body .pagebuilder', 'article']);
showSampleWidgets(document.querySelector('.site-footer .container'));
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
