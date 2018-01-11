import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import ReactPostList from './ReactPostList';
import ReactClock from './ReactClock';
import Clock from './Clock';
import PostList from './PostList';

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

export default function renderSampleWidgetsTo({ react, vanilla }) {
  const PostListEl = PostList();
  const ClockEl = Clock();

  if (vanilla) {
    vanilla.appendChild(PostListEl);
    vanilla.appendChild(ClockEl);
  }

  if (react) {
    renderReact(react);
  }

  if (module.hot) {
    module.hot.accept('./Clock', () => {
      // const container = vanilla.querySelector('.Clock');
      vanilla.replaceChild(Clock(), vanilla.children[1]);
    });

    module.hot.accept('./PostList', () => {
      // const container = vanilla.querySelector('.post-list');
      vanilla.replaceChild(PostList(), vanilla.children[0]);
    });

    module.hot.accept('./ReactPostList', () => {
      renderReact(react);
    });

    module.hot.accept('./ReactClock', () => {
      renderReact(react);
    });
  }
}
