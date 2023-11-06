import { hideModal, showModal } from './modal.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const shownCommentsCount = bigPicture.querySelector('.social__comment-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const socialComment = commentsList.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader')
const pictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

bigPictureCloseButton.addEventListener('click', hideModal);

const renderSocialComment = (comments) => {
    const commentsFragment = document.createDocumentFragment();
    comments.forEach((comment) => {
      const commentElement = socialComment.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      commentsFragment.append(commentElement);
    });
    commentsList.append(commentsFragment);
  };

const renderBigPicture = (picture) => {
    showModal();

    commentsList.innerHTML = '';
    shownCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPictureImg.src = picture.url;
    likesCount.textContent = picture.likes;
    pictureCaption.textContent = picture.description;
    totalCommentsCount.textContent = picture.comments.length;

    renderSocialComment(picture.comments);
};

export { renderBigPicture };