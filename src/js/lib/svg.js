import { el } from 'redom';
import req from './req';

const loadSVG = (path) => {
  const placeholder = el('.svg-placeholder');

  req(path)
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

