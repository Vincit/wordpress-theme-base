const enhanceColorField = () => {
  const removeColor = (elmt) => {
    elmt.className = elmt.className.replace(/bg--(\w*)/, '');
  };
  const setColor = (elmt, color) => {
    elmt.classList.add(`bg--${color}`);
  };

  Array.from(document.querySelectorAll('[data-name="color"] select')).forEach((select) => {
    if (select.value) {
      const parent = select.closest('[data-name="color"]');
      removeColor(parent);
      setColor(parent, select.value);
    }
  });

  window.addEventListener('change', (e) => {
    const target = e.target;
    const selectContainer = target.closest('[data-name="color"]');

    if (selectContainer) {
      removeColor(selectContainer);
      setColor(selectContainer, target.value);
    }
  });
};

export default enhanceColorField;
