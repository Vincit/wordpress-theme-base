import './client.styl';
import clock from './js/components/clock';

let clockEl = clock();
document.body.appendChild(clockEl);

if (module.hot) {
  module.hot.accept('./js/components/clock', () => {
    const nextClock = require('./js/components/clock').default();

    document.body.replaceChild(nextClock, clockEl);
    clockEl = nextClock;
  });
}
