import { renderBigPicture } from './render-big-picture.js';

const picturesContainer = document.querySelector('.pictures');

const picturesTitle = picturesContainer.querySelector('.pictures__title');
picturesTitle.classList.remove('visually-hidden');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPicturesGallery = (posts) => {
  const pictureGalleryFragment = document.createDocumentFragment();

  posts.forEach(({ url, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', () => {
      renderBigPicture({ url, likes, comments });
    });

    pictureGalleryFragment.append(pictureElement);
  });

  picturesContainer.append(pictureGalleryFragment);
};

export { renderPicturesGallery };
