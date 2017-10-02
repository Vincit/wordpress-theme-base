import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'normalize.css';

import MobileNavigation from './js/components/MobileNavigation';
import EnhanceWPElements from './js/components/EnhanceWPElements';
import showSampleWidgets from './js/sample';

import './client.styl';
import './js/skip-link-focus-fix';

new MobileNavigation();
new EnhanceWPElements(['body .pagebuilder', 'article']);

showSampleWidgets(document.querySelector('.site-footer .container'));
OfflinePluginRuntime.install();

const o1 = { a: 'hello' };
const o2 = { b: 'world' };

// console.log(Object.assign({}, o1, o2));
console.log({
  ...o1,
  ...o2,
});

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
