import { renderPicturesGallery } from './thumbnails.js';
import { addBigPictureListeners } from './render-big-picture.js';
import { getData } from '../api/api.js';
import { showAlert } from '../util/util.js';
import { initFilter } from './sort.js';

const GET_URL = 'https://30.javascript.pages.academy/kekstagram/data';

const initPosts = () => {
  getData(
    GET_URL,
    (data) => {
      renderPicturesGallery(data);
      initFilter(data);
      addBigPictureListeners();
    },
    showAlert
  );
};

export {initPosts};
