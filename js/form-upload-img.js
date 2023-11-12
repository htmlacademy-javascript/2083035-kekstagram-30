import { isEscapeKey } from './util.js';
import { addValidator, validatePristine, resetPristine } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImgInput = document.querySelector('.img-upload__input');
const uploadFormModal = document.querySelector('.img-upload__overlay');
const formCloseButtom = document.querySelector('.img-upload__cancel');

const openForm = () => {
    uploadFormModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    formCloseButtom.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
};

const hideForm = () => {
    uploadForm.reset();
    resetPristine();
    uploadFormModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    formCloseButtom.addEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
};

function onCloseButtonClick() {
    hideForm();
};

function onDocumentKeydown(evt) {
    if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
        evt.preventDefault();
        hideForm();
    }
};

function onUploadInputChange() {
    openForm();
};

function onFormSubmit(evt) {
    evt.preventDefault();
    validatePristine();
}

const setForm = () => {
    uploadImgInput.addEventListener('change', onUploadInputChange);
    uploadForm.addEventListener('submit', onFormSubmit);
    addValidator();
};

export { setForm };