import { isEscapeKey } from '../util/util.js';

const userMessageSuccess = document.querySelector('#success').content.querySelector('.success');
const userMessageError = document.querySelector('#error').content.querySelector('.error');

const closeSuccessPopupMessage = () => {
  const successPopup = document.querySelector('.success');
  successPopup.remove();
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  document.removeEventListener('click', onOutSideClick);
};

const showSuccessSendDataMessage = () => {
  const messageTemplate = userMessageSuccess.cloneNode(true);
  messageTemplate.querySelector('.success__button').addEventListener('click', closeSuccessPopupMessage);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.addEventListener('click', onOutSideClick);
  document.body.append(messageTemplate);
};

function onOutSideClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  closeSuccessPopupMessage();
}

function onDocumentKeydownSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopupMessage();
  }
}

const closeErrorPopupMessage = () => {
  const errorPopup = document.querySelector('.error');
  errorPopup.remove();
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('click', onOutSideClick);
};

const showErrorSendDataMessage = () => {
  const messageTemplate = userMessageError.cloneNode(true);
  messageTemplate.querySelector('.error__button').addEventListener('click', closeErrorPopupMessage);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click', onOutSideClick);
  document.body.append(messageTemplate);
};

function onDocumentKeydownError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopupMessage();
  }
}

export { showSuccessSendDataMessage, showErrorSendDataMessage };
