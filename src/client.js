import 'normalize.css';
import './client.styl';
import './js/skip-link-focus-fix';
import MobileNavigation from './js/components/MobileNavigation';
import EnhanceWPElements from './js/components/EnhanceWPElements';
import showSampleWidgets from './js/sample';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

new MobileNavigation();
window.lol = new EnhanceWPElements(['body .pagebuilder', 'article']);

showSampleWidgets(document.querySelector('.site-footer .container'));
OfflinePluginRuntime.install();
