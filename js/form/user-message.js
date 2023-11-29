import { isEscapeKey } from '../util/util.js';

const userMessageSuccess = document.querySelector('#success').content.querySelector('.success');
const userMessageError = document.querySelector('#error').content.querySelector('.error');

const closeSuccessPopupMessage = () => {
  const successPopup = document.querySelector('.success');
  successPopup.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutSideSuccessClick);
};

const showSuccessSendDataMessage = () => {
  const messageTemplate = userMessageSuccess.cloneNode(true);
  messageTemplate.querySelector('.success__button').addEventListener('click', closeSuccessPopupMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutSideSuccessClick);
  document.body.append(messageTemplate);
};

function onOutSideSuccessClick(evt) {
  if (evt.target.closest('.success__inner')) {
    return;
  }
  closeSuccessPopupMessage();
}

const closeErrorPopupMessage = () => {
  const errorPopup = document.querySelector('.error');
  errorPopup.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutSideErrorClick);
};

const showErrorSendDataMessage = () => {
  const messageTemplate = userMessageError.cloneNode(true);
  messageTemplate.querySelector('.error__button').addEventListener('click', closeErrorPopupMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutSideErrorClick);
  document.body.append(messageTemplate);
};

function onOutSideErrorClick(evt) {
  if (evt.target.closest('.error__inner')) {
    return;
  }
  closeErrorPopupMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector('.error')) {
      closeErrorPopupMessage();
      return;
    }
    closeSuccessPopupMessage();
  }
}

export { showSuccessSendDataMessage, showErrorSendDataMessage };
