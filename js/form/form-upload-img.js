import { isEscapeKey } from '../util/util.js';
import { addValidator, validatePristine, resetPristine } from './validation.js';
import { resetScale } from './img-scale.js';
import { resetEffects, hideSlider } from './img-effects.js';
import { sendData } from '../api/api.js';
import { showSuccessSendDataMessage, showErrorSendDataMessage } from './user-message.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImgInput = document.querySelector('.img-upload__input');
const uploadFormModal = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');
const formSubmitButton = document.querySelector('.img-upload__submit');

const openForm = () => {
  hideSlider();
  uploadFormModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const setSubmitButtonStatus = (isDisabled) => {
  formSubmitButton.disabled = isDisabled;
};

const closeForm = () => {
  uploadForm.reset();
  resetEffects();
  resetPristine();
  resetScale();
  setSubmitButtonStatus(false);
  uploadFormModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formCloseButton.addEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onCloseButtonClick() {
  closeForm();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

function onUploadInputChange(evt) {
  const input = evt.target;
  const file = input.files[0];
  const reader = new FileReader();
  const imgContainer = document.querySelector('.img-upload__preview');
  const img = imgContainer.querySelector('img');
  reader.readAsDataURL(file);
  reader.onload = function () {
    img.src = reader.result;
    openForm();
  };
}

const initForm = () => {
  uploadImgInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validatePristine();
    if (isValid) {
      setSubmitButtonStatus(true);
      sendData(new FormData(evt.target))
        .then(closeForm)
        .then(showSuccessSendDataMessage)
        .catch(showErrorSendDataMessage)
        .catch(setSubmitButtonStatus(false))
    }
  });
  addValidator();
};

export { initForm };