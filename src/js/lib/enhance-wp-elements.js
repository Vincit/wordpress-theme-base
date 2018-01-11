import { el, mount } from 'redom';
import { mockbox, mockradio } from '../lib/form';

class EnhanceWPElements {
  constructor(selectors = ['article']) {
    this.enhanced = selectors.reduce((acc, selector) => {
      const parent = document.querySelector(selector);

      if (parent) {
        acc[selector] = {
          ...this.makeTablesResponsive(parent),
          ...this.armTremors(parent),
          ...this.cleanMedia(parent),
          ...this.mockCheckboxes(parent),
          ...this.mockRadios(parent),
        };
      }

      return acc;
    }, {});
  }

  makeTablesResponsive(parent) {
    const tables = Array.from(parent.querySelectorAll('table')).map((table) => {
      const wrap = el('.responsive-table');
      table.parentNode.replaceChild(wrap, table);
      mount(wrap, table);

      return wrap;
    });

    return {
      tables,
    };
  }

  armTremors(parent) {
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

    const tremors = Array.from(parent.querySelectorAll('.tremor')).map((tremor) => {
      tremor.addEventListener('click', shakeshake);
      return tremor;
    });

    return {
      tremors,
    };
  }

  /*
   * Removes paragraph tags from images, removes inline styles.
   */
  cleanMedia(parent) {
    const media = [
      ...Array.from(parent.querySelectorAll('.wp-caption')).map((caption) => {
        if (caption.getAttribute('style')) {
          caption.removeAttribute('style');
        }

        return caption;
      }),
      ...Array.from(parent.querySelectorAll('p > img')).map((img) => {
        const p = img.parentNode;
        if (p.tagName === 'P') {
          p.parentNode.insertBefore(img, p);
          p.parentNode.removeChild(p);
        }

        return img;
      }),
    ];

    return {
      media,
    };
  }

  mockCheckboxes(parent) {
    const checkboxes = Array.from(parent.querySelectorAll('input[type="checkbox"]')).map(mockbox);

    return { checkboxes };
  }

  mockRadios(parent) {
    const radios = Array.from(parent.querySelectorAll('input[type="radio"]')).map(mockradio);

    return { radios };
  }
}

export default function enhanceWPElements(selectors) {
  return new EnhanceWPElements(selectors);
}
