import 'regenerator-runtime/runtime';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'normalize.css';

import mobileNavigation from './js/components/MobileNavigation';
import enhanceWPElements from './js/components/EnhanceWPElements';
import showSampleWidgets from './js/sample';
import skipLinkFocusFix from './js/skipLinkFocusFix';
import transformURLsWebpackDevServer from './js/lib/transform-urls-wds';

import './client.styl';

function main(err) {
  if (err) {
    console.error(err);
    return;
  }

  skipLinkFocusFix();
  mobileNavigation();
  enhanceWPElements(['body .pagebuilder', 'article']);
  showSampleWidgets({
    react: document.querySelector('.site-footer .react-widget-container'),
    vanilla: document.querySelector('.site-footer .vanilla-widgets'),
  });

  if (module.hot) {
    transformURLsWebpackDevServer();
  }
}

function browserSupportsAllFeatures() {
  return window.Promise && window.fetch;
}

function loadScript(src, done) {
  const js = document.createElement('script');

  js.src = src;
  js.onload = () => {
    done();
  };
  js.onerror = () => {
    done(new Error(`Failed to load script ${src}`));
  };

  document.head.appendChild(js);
}

OfflinePluginRuntime.install();
if (browserSupportsAllFeatures()) {
  main();
} else {
  loadScript(`${window.theme.directory}/dist/polyfill.js`, main);
}
