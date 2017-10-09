import transformURLsWebpackDevServer from './js/lib/transform-urls-wds';

import './admin.styl';

if (module.hot) {
  transformURLsWebpackDevServer();
}
