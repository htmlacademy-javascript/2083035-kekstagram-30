import { renderBigPicture } from './render-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPicturesGallery = (posts) => {
  const pictureGalleryFragment = document.createDocumentFragment();

  posts.forEach((data) => {
    const { url, likes, comments } = data;
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', () => {
      renderBigPicture(data);
    });

    pictureGalleryFragment.append(pictureElement);
  });

  picturesContainer.append(pictureGalleryFragment);
};

export { renderPicturesGallery };
