import { el, setChildren } from 'redom';

export default class {
  constructor({
    header = '.mobile-header',
    menuButton = '.menu-toggle',
    searchButton = '.search-toggle',
    navigationElement = '.mobile-navigation',
    searchElement = '.mobile-search',
  } = {}) {
    this.root = document.querySelector(header);
    this.menuButton = document.querySelector(`${header} ${menuButton}`);
    this.searchButton = document.querySelector(`${header} ${searchButton}`);
    this.navigationElement = document.querySelector(`${header} ${navigationElement}`);
    this.searchElement = document.querySelector(`${header} ${searchElement}`);

    this.state = {
      menuOpen: false,
      searchOpen: false,
    };

    this.enhance(this.navigationElement);
    this.addEventHandlers();
  }

  handleEvent(e) {
    switch (e.type) {
    case 'click': {
      const button = e.target.closest('button');
      if (button === this.menuButton) {
        this.toggleMenu();
      } else if (button === this.searchButton) {
        this.toggleSearch();
      } else {
        console.warn('Unhandled click event in MobileNavigation');
      }
      break;
    }
    }
  }

  setState(newState, cb) {
    let state;
    if (newState instanceof Function) {
      state = newState(this.state);
    } else {
      state = newState;
    }

    this.state = Object.assign({}, this.state, state);

    if (cb) {
      cb(this.state);
    }
  }

  addEventHandlers() {
    const listenerOptions = { capture: true, passive: true };
    this.menuButton.addEventListener('click', this, listenerOptions);
    this.searchButton.addEventListener('click', this, listenerOptions);
  }

  removeEventHandlers() {
    this.menuButton.removeEventListener('click', this);
    this.searchButton.removeEventListener('click', this);
  }

  enhance(element, itemSelector = '.menu-item') {
    Array.from(element.querySelectorAll(itemSelector)).
      forEach((item) => {
        const wrapper = el('.item-wrapper');
        const handle = item.classList.contains('menu-item-has-children')
          ? el('button.menu-handle',
            el('img.open-icon', {
              src: `${window.theme.directory}/dist/img/svg/menu-with-open.svg`,
            }),
            el('img.close-icon', {
              src: `${window.theme.directory}/dist/img/svg/close.svg`,
            }),
          )
          : false;

        if (handle) {
          handle.addEventListener('click', () => {
            let open;
            if (typeof handle._open === 'undefined') {
              open = true;
            } else {
              open = !handle._open;
            }

            item.classList.toggle('open', open);
            handle._open = open;
          });
        }

        setChildren(wrapper, [item.querySelector('a'), handle]);
        setChildren(item, [wrapper, item.querySelector('.sub-menu')]);
      });
  }

  // toggle(element, button, stateKey) {
  toggle(el) {
    let element, stateKey, rootClass;

    if (el === 'menu') {
      element = this.navigationElement;
      stateKey = 'menuOpen';
      rootClass = 'menu-opened';
    } else if (el === 'search') {
      element = this.searchElement;
      stateKey = 'searchOpen';
      rootClass = 'search-opened';
    } else {
      console.error('Unable to toggle something that doesn\'t exist.');
    }

    this.setState((state) => {
      let status;

      if (state[stateKey]) {
        status = false;
      } else {
        status = true;
      }

      return {
        [stateKey]: status,
      };
    }, (state) => {
      element.classList.toggle('open', state[stateKey]);
      this.root.classList.toggle(rootClass, state[stateKey]);
    });
  }

  toggleMenu() {
    this.toggle('menu');
  }

  toggleSearch() {
    this.toggle('search');
  }
}
