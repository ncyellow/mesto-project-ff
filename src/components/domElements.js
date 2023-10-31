// Элементы DOM, которые мы будет использовать часто. (так как пока не вводили требования к названиям js файлов, я выбрал camelCase)

export const formEditProfile = document.forms['edit-profile'];
export const formAddCard = document.forms['new-place'];
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const cardContainer = document.querySelector('.places__list'); 
export const imagePopup = document.querySelector('.popup_type_image');
export const profileEditPopup = document.querySelector('.popup_type_edit');
export const addCardPopup = document.querySelector('.popup_type_new-card');
export const popups = [
    {
        openBtn: document.querySelector('.profile__edit-button'),
        popupWnd: profileEditPopup,
    },
    {
        openBtn: document.querySelector('.profile__add-button'),
        popupWnd: addCardPopup,
    },
]