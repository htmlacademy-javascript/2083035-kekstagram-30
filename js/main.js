import { renderPicturesGallery } from './thumbnails.js';
import { setFormSubmit, hideForm } from './form-upload-img.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((posts) => {
    renderPicturesGallery(posts);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setFormSubmit(hideForm);