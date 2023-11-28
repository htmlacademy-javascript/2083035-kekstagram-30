import { checkLength, checkRepeats } from '../util/util.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_QUANTITY = 5;
const COMMENT_MAX_LENGTH = 140;

const INVALID_HESHTAG_SYMBOLS = 'Хэштег должен начинаться с символа #, далее буквы и числа, но не более 20 символов';
const INVALID_HESHTAG_COUNT = 'Максимально может быть 5 хэштегов';
const INVALID_HESHTAG_UNIQUE = 'Хэштеги не могут повторяться';
const INVALID_COMMENT_LENGTH = `Максимальная длина комментария ${COMMENT_MAX_LENGTH} символов`;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('[name="hashtags"]');
const commentInput = document.querySelector('[name="description"]');

const createHashtage = (value) => value.trim().split(' ').filter(Boolean);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const checkHasHash = (value) => hashtagInput.value !== '' ? createHashtage(value)
  .every((hashtag) => HASHTAG_REGEX.test(hashtag)) : true;
const checkMaxQuantity = (value) => checkLength(createHashtage(value), HASHTAG_MAX_QUANTITY);
const checkNoRepetitions = (value) => checkRepeats(createHashtage(value));
const checkMaxLengthComment = () => checkLength(commentInput.value, COMMENT_MAX_LENGTH);

const addValidator = () => {
  pristine.addValidator(hashtagInput, checkHasHash, INVALID_HESHTAG_SYMBOLS);
  pristine.addValidator(hashtagInput, checkMaxQuantity, INVALID_HESHTAG_COUNT);
  pristine.addValidator(hashtagInput, checkNoRepetitions, INVALID_HESHTAG_UNIQUE);
  pristine.addValidator(commentInput, checkMaxLengthComment, INVALID_COMMENT_LENGTH);
};

const validatePristine = () => pristine.validate();
const resetPristine = () => pristine.reset();

export { addValidator, validatePristine, resetPristine };