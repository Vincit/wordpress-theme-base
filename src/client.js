import './client.styl';
import clock from './js/components/clock';

let clockEl = clock();
document.body.appendChild(clockEl);

if (module.hot) {
  module.hot.accept('./js/components/clock', () => {
    const nextClock = require('./js/components/clock').default();

    // I know what you're thinking. "Why not just call component() again?"
    // Because it has not changed. We have to require() it again to get the fresh one.
    // It's also possible to use dynamic imports instead of require().

    document.body.replaceChild(nextClock, clockEl);
    clockEl = nextClock;
  });
}
