import { renderPicturesGallery } from './posts/thumbnails.js';
import { initForm } from './form/form-upload-img.js';
import { getData } from './api/api.js';
import { showAlert } from './util/util.js';
import { initFilter } from './posts/sort.js';

getData()
  .then((posts) => {
    renderPicturesGallery(posts);
    initFilter(posts);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
initForm();
