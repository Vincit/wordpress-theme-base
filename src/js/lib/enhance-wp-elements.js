import { el, mount } from 'redom';
import { mockbox, mockradio } from 'lib/form';

/**
 * This ugly class does things to elements outputted by PHP.
 * It takes an array of selectors as argument on which elements to apply
 * the tweaks.
 */
class WPElementEnhancer {
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

  /*
   * Does what the name says. Wraps tables and CSS makes them scrollable.
   */
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

  /**
   *  Because I was bored.
   *  It's also a pretty good reminder to do something about the 404 page.
   */
  armTremors(parent) {
    const shakeshake = (e) => {
      alert('If flickering image may cause you harm, I suggest that you look away for a bit.'); // eslint-disable-line

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
   * "Wider than container" image layout is hard to pull of without.
   * (Negative margins and calc work though.)
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

  /**
   * Turn all checkboxes into custom checkboxes.
   * Uses the underlying checkbox.
   */
  mockCheckboxes(parent) {
    const checkboxes = Array.from(parent.querySelectorAll('input[type="checkbox"]')).map(mockbox);

    return { checkboxes };
  }

  /**
   * Turns all radio buttons into custom radio buttons.
   * Also uses the underlaying checkbox.
   */
  mockRadios(parent) {
    const radios = Array.from(parent.querySelectorAll('input[type="radio"]')).map(mockradio);

    return { radios };
  }
}

export default function enhanceWPElements(selectors) {
  return new WPElementEnhancer(selectors);
}
