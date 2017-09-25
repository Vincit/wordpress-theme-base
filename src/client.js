import 'normalize.css';
import './client.styl';
import './js/skip-link-focus-fix';
import MobileNavigation from './js/components/MobileNavigation';
import clock from './js/components/clock';
import postList from './js/components/post-list.redom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

new MobileNavigation();

const firstContentContainer = document.body.querySelector('main .container');
let clockEl = clock();
firstContentContainer.appendChild(clockEl);

let postListEl = postList();
firstContentContainer.appendChild(postListEl);

if (module.hot) {
  module.hot.accept('./js/components/clock', () => {
    const nextClock = require('./js/components/clock').default();

    // I know what you're thinking. 'Why not just call component() again?'
    // Because it has not changed. We have to require() it again to get the fresh one.
    // It's also possible to use dynamic imports instead of require().

    firstContentContainer.replaceChild(nextClock, clockEl);
    clockEl = nextClock;
  });

  module.hot.accept('./js/components/post-list.redom', () => {
    const nextPostList = require('./js/components/post-list.redom').default();

    firstContentContainer.replaceChild(nextPostList, postListEl);
    postListEl = nextPostList;
  });
}

/* if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${window.theme.directory}/src/serviceworker.js`)
    .then((reg) => {
      console.log('Successfully registered service worker', reg);
      return;
    }).catch((err) => {
      console.warn('Error whilst registering service worker', err);
    });
}

window.addEventListener('online', (e) => {
  console.log('You are online', e);
}, false);

window.addEventListener('offline', (e) => {
  console.log('You are offline', e);
}, false);

// Check if the user is connected.
if (navigator.onLine) {
  console.log('You are online');
} else {
  console.log('You are offline');
} */

OfflinePluginRuntime.install();
