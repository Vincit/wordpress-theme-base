import { el, mount } from 'redom';

export default class EnhanceWPElements {
  constructor(selectors = ['article']) {
    this.enhanced = selectors.reduce((acc, selector) => {
      const element = document.querySelector(selector);

      if (element) {
        acc[selector] = Object.assign(
          {},
          this.makeTablesResponsive(element)
        );
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
}
