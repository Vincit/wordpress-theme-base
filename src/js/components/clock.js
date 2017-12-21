import { el } from 'redom';

export const maybePad = (number) => (number.toString().length > 1 ? number : `0${number}`);
export const ymdhis = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = maybePad(date.getMonth() + 1);
  const d = maybePad(date.getDate());
  const h = maybePad(date.getHours());
  const i = maybePad(date.getMinutes());
  const s = maybePad(date.getSeconds());

  return `${y}-${m}-${d} ${h}:${i}:${s}`;
};

export default function clock() {
  const element = el('time.clock');

  // To stop the interval: clearInterval(clock._interval);
  element._interval = setInterval(() => {
    element.textContent = ymdhis();
  }, 1000);

  return element;
}
