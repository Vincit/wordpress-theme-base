// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactPostList from './components/reactPostList';
import clock from './components/clock';
import postList from './components/postList.redom';

export default function showSampleWidgets(element) {
  // ReactDOM.render(<ReactPostList />, element);

  let clockEl = clock();
  element.appendChild(clockEl);

  let postListEl = postList();
  element.appendChild(postListEl);

  if (module.hot) {
    /* eslint-disable global-require */
    module.hot.accept('./components/clock', () => {
      const nextClock = require('./components/clock').default();

      // I know what you're thinking. 'Why not just call component() again?'
      // Because it has not changed. We have to require() it again to get the fresh one.
      // It's also possible to use dynamic imports instead of require().

      element.replaceChild(nextClock, clockEl);
      clockEl = nextClock;
    });

    module.hot.accept('./components/postList.redom', () => {
      const nextPostList = require('./components/postList.redom').default();

      element.replaceChild(nextPostList, postListEl);
      postListEl = nextPostList;
    });
  }
}
