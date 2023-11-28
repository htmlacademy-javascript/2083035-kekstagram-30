const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const PERCENT = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const userPhoto = document.querySelector('.img-upload__preview img');

let currentValue = MAX_SCALE;

const scaleImage = () => {
  userPhoto.style.transform = `scale(${currentValue / PERCENT})`;
  scaleInputElement.value = `${currentValue}%`;
};

const onSmallerButtonClick = () => {
  currentValue = Math.max(currentValue - SCALE_STEP, MIN_SCALE);
  scaleImage();
};

const onBiggerButtonClick = () => {
  currentValue = Math.min(currentValue + SCALE_STEP, MAX_SCALE);
  scaleImage();
};

const resetScale = () => {
  currentValue = MAX_SCALE;
  scaleImage();
};

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
