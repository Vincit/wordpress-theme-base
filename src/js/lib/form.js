import { el } from 'redom';

const update = (mock, actual) => {
  if (actual.checked) {
    mock.classList.add('checked');
    mock.setAttribute('aria-checked', true);
  } else {
    mock.classList.remove('checked');
    mock.setAttribute('aria-checked', false);
  }
};

const mockbox = (actualCheckbox) => {
  const checkbox = el('.mockbox', {
    role: 'checkbox',
    'aria-checked': false,
  });

  actualCheckbox.style.position = 'absolute';
  actualCheckbox.style.left = '-9001px';
  actualCheckbox.addEventListener('change', update.bind(null, checkbox, actualCheckbox));
  actualCheckbox.parentNode.insertBefore(checkbox, actualCheckbox);

  return checkbox;
};

const mockradio = (actualRadio) => {
  const radio = el('.mockradio', {
    role: 'radio',
    'aria-checked': false,
  });

  console.log(actualRadio);
  // actualRadio.style.position = 'absolute';
  actualRadio.style.left = '-9001px';
  actualRadio.addEventListener('change', update.bind(null, radio, actualRadio));
  actualRadio.parentNode.insertBefore(radio, actualRadio);

  return radio;
};

export {
  mockbox,
  mockradio,
};
