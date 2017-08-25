import './client.styl';
import clock from './js/components/clock';
import postList from './js/components/post-list.redom';

let clockEl = clock();
document.body.appendChild(clockEl);

let postListEl = postList();
document.body.appendChild(postListEl);

if (module.hot) {
  module.hot.accept('./js/components/clock', () => {
    const nextClock = require('./js/components/clock').default();

    // I know what you're thinking. "Why not just call component() again?"
    // Because it has not changed. We have to require() it again to get the fresh one.
    // It's also possible to use dynamic imports instead of require().

    document.body.replaceChild(nextClock, clockEl);
    clockEl = nextClock;
  });

  module.hot.accept('./js/components/post-list.redom', () => {
    const nextPostList = require('./js/components/post-list.redom').default();

    document.body.replaceChild(nextPostList, postListEl);
    postListEl = nextPostList;
  });
}
