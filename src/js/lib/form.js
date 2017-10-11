import { el } from 'redom';

const mockbox = (real) => {
  const checkbox = el('.mockbox', {
    role: 'checkbox',
    'aria-checked': false,
  });

  real.style.position = 'absolute';
  real.style.left = '-9001px';
  real.parentNode.insertBefore(checkbox, real);
  real.addEventListener('change', () => {
    if (real.checked) {
      checkbox.classList.add('checked');
      checkbox.setAttribute('aria-checked', true);
    } else {
      checkbox.classList.remove('checked');
      checkbox.setAttribute('aria-checked', false);
    }
  });

  return checkbox;
};

const mockradio = (real) => {
  const radio = el('.mockradio', {
    role: 'radio',
    'aria-checked': false,
  });
  const form = real.closest('form');

  real.style.position = 'absolute';
  real.style.left = '-9001px';
  real.parentNode.insertBefore(radio, real);
  real.addEventListener('change', () => {
    // It's necessary to query on every change, as more elements may have appeared.
    const members = Array.from(form.querySelectorAll(`[name="${real.name}"]`));

    members.forEach((member) => {
      const mock = member.previousElementSibling;
      if (real.checked && member === real) {
        mock.classList.add('checked');
        mock.setAttribute('aria-checked', true);
      } else {
        mock.classList.remove('checked');
        mock.setAttribute('aria-checked', false);
      }
    });
  });

  return radio;
};

export {
  mockbox,
  mockradio,
};
