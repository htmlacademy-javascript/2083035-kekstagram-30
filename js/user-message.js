import { isEscapeKey } from './util.js';

const userMessageError = document.querySelector('#error').content.querySelector('.error');
const userMessageSuccess = document.querySelector('#success').content.querySelector('.success');

const closeErrorPopupMessage = () => {
  document.removeEventListener('keydown', onDocumentKeydownError);
  const errorPopup = document.querySelector('.error');
  errorPopup.remove();
};

const onOutSideErrorClick = (evt) => {
  const errorPopup = document.querySelector('.error__inner');
  if (evt.target !== errorPopup) {
    closeErrorPopupMessage();
  }
};

const showErrorSendDataMessage = () => {
  const messageTemplte = userMessageError.cloneNode(true);
  messageTemplte.querySelector('.error__button').addEventListener('click', closeErrorPopupMessage);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click', onOutSideErrorClick);
  document.body.append(messageTemplte);
};

function onDocumentKeydownError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopupMessage();
  }
}

const closeSuccessPopupMessage = () => {
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  const successPopup = document.querySelector('.success');
  successPopup.remove();
};

const onOutSideSuccessClick = (evt) => {
  const successPopup = document.querySelector('.success__inner');
  if (evt.target !== successPopup) {
    closeSuccessPopupMessage();
  }
};

const showSuccessSendDataMessage = () => {
  const messageTemp = userMessageSuccess.cloneNode(true);
  messageTemp.querySelector('.success__button').addEventListener('click', closeSuccessPopupMessage);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.addEventListener('click', onOutSideSuccessClick);
  document.body.append(messageTemp);
};

function onDocumentKeydownSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopupMessage();
  }
}

export { showSuccessSendDataMessage, showErrorSendDataMessage };
