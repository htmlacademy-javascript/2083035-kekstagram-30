import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');

const hideModalPressEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const hideModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', hideModalPressEsc);
};

const showModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', hideModalPressEsc);
};

export { hideModal, showModal };
