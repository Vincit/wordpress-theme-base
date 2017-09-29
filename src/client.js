import 'normalize.css';
import './client.styl';
import './js/skip-link-focus-fix';
import MobileNavigation from './js/components/MobileNavigation';
import showSampleWidgets from './js/sample';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

new MobileNavigation();

showSampleWidgets(document.querySelector('.site-footer .container'));
OfflinePluginRuntime.install();
