// Элементы DOM, которые мы будет использовать часто. (так как пока не вводили требования к названиям js файлов, я выбрал camelCase)

export const formEditProfile = document.forms['edit-profile'];
export const formAddCard = document.forms['new-place'];
export const formEditAvatar = document.forms['edit-avatar'];
export const profileImg = document.querySelector('.profile__image');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector(
  '.profile__description'
);
export const cardContainer = document.querySelector('.places__list');
export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupSource = document.querySelector('.popup__image');
export const imagePopupCaption = document.querySelector('.popup__caption');
export const profileEditPopup = document.querySelector('.popup_type_edit');
export const addCardPopup = document.querySelector('.popup_type_new-card');
export const editAvatarPopup = document.querySelector(
  '.popup_type_edit-avatar'
);
