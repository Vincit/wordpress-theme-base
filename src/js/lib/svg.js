import { el } from 'redom';
import fetch from './fetch';

const loadSVG = (path) => {
  const placeholder = el('.svg-placeholder');

  fetch(path)
    .then((r) => r.text())
    .then((svg) => {
      placeholder.parentNode.insertAdjacentHTML('afterbegin', svg);
      placeholder.parentNode.removeChild(placeholder);
    })
    .catch((err) => {
      console.error(err);
    });

  return placeholder;
};

const inlineSVG = (path, classes) => el(`.inline-svg${classes}`, loadSVG(path));

export {
  loadSVG,
  inlineSVG,
};

