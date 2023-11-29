import { isEscapeKey } from '../util/util.js';
import { addValidator, validatePristine, resetPristine } from './validation.js';
import { resetScale } from './img-scale.js';
import { resetEffects, hideSlider } from './img-effects.js';
import { sendData } from '../api/api.js';
import { showSuccessSendDataMessage, showErrorSendDataMessage } from './user-message.js';

const SEND_URL = 'https://30.javascript.pages.academy/kekstagram/';
const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImgInput = document.querySelector('.img-upload__input');
const uploadFormModal = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');
const formSubmitButton = document.querySelector('.img-upload__submit');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const imgPreview = document.querySelector('.img-upload__preview img');

const resetImages = () => {
  imgPreview.src = DEFAULT_IMAGE;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url('${DEFAULT_IMAGE}')`;
  });
};

const openForm = () => {
  hideSlider();
  uploadFormModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCloseButton.addEventListener('click', onFormCloseButtonClick);
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
  resetImages();
  uploadFormModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formCloseButton.removeEventListener('click', onFormCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onFormCloseButtonClick() {
  closeForm();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description') && !document.querySelector('.error')) {
    evt.preventDefault();
    closeForm();
  }
}

function onUploadInputChange(evt) {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const src = URL.createObjectURL(file);
    imgPreview.src = src;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${src}')`;
    });
  }
  openForm();
}

const onGetSuccess = () => {
  setSubmitButtonStatus(false);
  closeForm();
  showSuccessSendDataMessage();
};

const onGetError = () => {
  setSubmitButtonStatus(false);
  showErrorSendDataMessage();
};

const initForm = () => {
  addValidator();
  uploadImgInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validatePristine();
    if (isValid) {
      setSubmitButtonStatus(true);
      sendData(SEND_URL, new FormData(evt.target), onGetSuccess, onGetError);
    }
  });
};

export { initForm };
