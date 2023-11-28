import { renderPicturesGallery } from './thumbnails.js';
import { getRandomIndex, debounce } from '../util/util.js';

const RANDOM_PHOTOS_AMOUNT = 10;

const filterSection = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const discussedBtn = document.querySelector('#filter-discussed');

const Filter = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterHandlers = {
  [Filter.DEFAULT]: (data) => data,
  [Filter.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(RANDOM_PHOTOS_AMOUNT, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [Filter.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

const repaint = (evt, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderPicturesGallery(filteredData);

  const currentActiveFilter = filterForm.querySelector('.img-filters__button--active');
  currentActiveFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const debounceRepaint = debounce((event, filter, data) => {
  repaint(event, filter, data);
});

const handleFilterClick = (event, filter, data) => {
  debounceRepaint(event, filter, data);

  const activeButtonClass = 'img-filters__button--active';
  filterForm.querySelector(`.${activeButtonClass}`).classList.remove(activeButtonClass);
  event.target.classList.add(activeButtonClass);
};

const initFilter = (data) => {
  filterSection.classList.remove('img-filters--inactive');
  defaultBtn.addEventListener('click', (evt) => {
    handleFilterClick(evt, Filter.DEFAULT, data);
  });
  randomBtn.addEventListener('click', (evt) => {
    handleFilterClick(evt, Filter.RANDOM, data);
  });
  discussedBtn.addEventListener('click', (evt) => {
    handleFilterClick(evt, Filter.DISCUSSED, data);
  });
};

export { initFilter };
