export default function clock() {
  const ymdhis = () => {
    const d = new Date();
    const h = d.getHours().toString().length > 1 ? d.getHours() : `0${d.getHours()}`;
    const m = d.getMinutes().toString().length > 1 ? d.getMinutes() : `0${d.getMinutes()}`;
    const s = d.getSeconds().toString().length > 1 ? d.getSeconds() : `0${d.getSeconds()}`;

    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${h}:${m}:${s}`;
  };

  const clock = document.createElement('time');

  // To stop the interval: clearInterval(clock._interval);
  clock._interval = setInterval(() => {
    clock.textContent = ymdhis();
  }, 1000);

  return clock;
}
