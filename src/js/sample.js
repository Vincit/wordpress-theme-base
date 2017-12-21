import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ReactPostList from './components/reactPostList';
import ReactClock from './components/reactClock';
import clock from './components/clock';
import postList from './components/postList';

const renderReact = (element) => {
  ReactDOM.render(
    <AppContainer>
      <Fragment>
        <ReactPostList />
        <ReactClock />
      </Fragment>
    </AppContainer>,
    element
  );
};

export default function showSampleWidgets({ react, vanilla }) {
  const postListEl = postList();
  const clockEl = clock();

  if (vanilla) {
    vanilla.appendChild(postListEl);
    vanilla.appendChild(clockEl);
  }

  if (react) {
    renderReact(react);
  }

  if (module.hot) {
    module.hot.accept('./components/clock', () => {
      // const container = vanilla.querySelector('.clock');
      vanilla.replaceChild(clock(), vanilla.children[1]);
    });

    module.hot.accept('./components/postList', () => {
      // const container = vanilla.querySelector('.post-list');
      vanilla.replaceChild(postList(), vanilla.children[0]);
    });

    module.hot.accept('./components/reactPostList', () => {
      renderReact(react);
    });
  }
}
