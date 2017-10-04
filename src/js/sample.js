import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ReactPostList from './components/reactPostList';
import ReactClock from './components/reactClock';
import clock from './components/clock';
import postList from './components/postList';

const renderReact = (element) => {
  ReactDOM.render(
    <AppContainer>
      <div className="react-widgets">
        <div className="clock">
          <ReactClock />
        </div>
        <div className="post-list">
          <ReactPostList />
        </div>
      </div>
    </AppContainer>,
    element
  );
};

export default function showSampleWidgets({ react, vanilla }) {
  const clockEl = clock();
  vanilla.querySelector('.clock').appendChild(clockEl);

  const postListEl = postList();
  vanilla.querySelector('.post-list').appendChild(postListEl);

  if (react) {
    renderReact(react);
  }

  if (module.hot) {
    module.hot.accept('./components/clock', () => {
      const container = vanilla.querySelector('.clock');
      container.replaceChild(clock(), container.children[0]);
    });

    module.hot.accept('./components/postList', () => {
      const container = vanilla.querySelector('.post-list');
      container.replaceChild(postList(), container.children[0]);
    });

    module.hot.accept('./components/reactPostList', () => {
      renderReact(react);
    });
  }
}
