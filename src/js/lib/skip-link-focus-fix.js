/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
const skipLinkFocusFix = () => {
  const isIe = /(trident|msie)/i.test(navigator.userAgent);

  if (isIe && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', () => {
      const id = window.location.hash.substring(1);

      if (!(/^[A-z0-9_-]+$/.test(id))) {
        return;
      }

      const element = document.getElementById(id);

      if (element) {
        if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
};

export default skipLinkFocusFix;
