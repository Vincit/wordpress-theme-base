import { el, mount } from 'redom';

class EnhanceWPElements {
  constructor(selectors = ['article']) {
    this.enhanced = selectors.reduce((acc, selector) => {
      const element = document.querySelector(selector);

      if (element) {
        acc[selector] = {
          ...this.makeTablesResponsive(element),
          ...this.armTremors(element),
        };
      }

      return acc;
    }, {});
  }

  makeTablesResponsive(element) {
    const tables = Array.from(element.querySelectorAll('table')).map((table) => {
      const wrap = el('.responsive-table');
      table.parentNode.replaceChild(wrap, table);
      mount(wrap, table);

      return wrap;
    });

    return {
      tables,
    };
  }

  armTremors(element) {
    const shakeshake = (e) => {
      alert('Oh no. \n\n\nRun.\n\n(flickering warning)'); // eslint-disable-line

      let iteration = 0;
      const translate = (n) => {
        const dir = Math.random() <= 0.5 ? 'X' : 'Y';
        const mod = Math.random() <= 0.5 ? '-' : '';

        n.style.transform = `translate${dir}(${mod}${iteration}%)`;
      };
      const skew = (n) => {
        const r = (Math.random() * (15 - 5)) + 5;
        const s = (Math.random() * (20 - 3)) + 3;
        n.style.transform = `rotateX(-${r}deg) skew(${s}deg)`;
        return n;
      };
      const reset = (n) => {
        n.style.transform = n.oldTransform;
        return n;
      };
      const everything = Array.from(document.querySelectorAll('*'))
        .map((n) => {
          n.oldTransform = n.style.transform;
          return n;
        });

      const animate = () => {
        everything.forEach(translate);

        if (iteration <= 100) {
          iteration += 1;
          requestAnimationFrame(animate);
        } else {
          e.target.parentNode.removeChild(e.target);
          everything.map(reset).forEach(skew);
        }
      };

      requestAnimationFrame(animate);
    };

    const tremors = Array.from(element.querySelectorAll('.tremor')).map((tremor) => {
      tremor.addEventListener('click', shakeshake);
      return tremor;
    });

    return {
      tremors,
    };
  }
}

export default function enhanceWPElements(selectors) {
  return new EnhanceWPElements(selectors);
}
