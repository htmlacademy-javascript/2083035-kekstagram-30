import { isEscapeKey } from '../util/util.js';

const COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const modalCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const shownCommentsCount = document.querySelector('.social__comment-shown-count');
const totalCommentsCount = document.querySelector('.social__comment-total-count');
const commentsLoader = document.querySelector('.comments-loader');

let comments = [];
let showingComments = 0;

const renderBigPictureInfo = (picture) => {
  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  likesCount.textContent = picture.likes;
  pictureCaption.textContent = picture.description;
};

const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  const commentAvatar = newComment.querySelector('.social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  commentsList.append(newComment);
};

const fillCommentsCount = () => {
  shownCommentsCount.textContent = Math.min(showingComments, comments.length);
};

const setStateButton = () => {
  commentsLoader.classList.toggle('hidden', showingComments >= comments.length);
};

const showComments = () => {
  comments.slice(showingComments, showingComments + COMMENTS_COUNT).forEach((comment) => createComment(comment));
  showingComments = showingComments + COMMENTS_COUNT;
  fillCommentsCount();
  setStateButton();
};

const onButtonLoadingClick = () => {
  showComments();
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onModalCloseButton() {
  closeModal();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const addBigPictureListeners = () => {
  commentsLoader.addEventListener('click', onButtonLoadingClick);
  modalCloseButton.addEventListener('click', onModalCloseButton);
};

const renderBigPicture = (post) => {
  comments = post.comments;
  commentsList.innerHTML = '';
  totalCommentsCount.textContent = comments.length;
  showingComments = 0;
  openModal();
  renderBigPictureInfo(post);
  showComments();
};

export { renderBigPicture, addBigPictureListeners };
