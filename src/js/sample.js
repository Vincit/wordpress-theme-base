import clock from './components/clock';
import postList from './components/post-list.redom';

export default function showSampleWidgets(element) {
  let clockEl = clock();
  element.appendChild(clockEl);

  let postListEl = postList();
  element.appendChild(postListEl);

  if (module.hot) {
    module.hot.accept('./components/clock', () => {
      const nextClock = require('./components/clock').default();

      // I know what you're thinking. 'Why not just call component() again?'
      // Because it has not changed. We have to require() it again to get the fresh one.
      // It's also possible to use dynamic imports instead of require().

      element.replaceChild(nextClock, clockEl);
      clockEl = nextClock;
    });

    module.hot.accept('./components/post-list.redom', () => {
      const nextPostList = require('./components/post-list.redom').default();

      element.replaceChild(nextPostList, postListEl);
      postListEl = nextPostList;
    });
  }
}
