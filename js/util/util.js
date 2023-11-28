const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlert = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const checkLength = (array, maxLength) => array.length <= maxLength;

const checkRepeats = (array) => {
  const toUpper = array.map((item) => item.toUpperCase());
  const arrayNoRepeats = new Set(toUpper);
  return arrayNoRepeats.size === toUpper.length;
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomIndex, isEscapeKey, checkLength, checkRepeats, showAlert, debounce };
