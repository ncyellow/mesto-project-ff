import {popups, profileEditPopup, cardContainer} from './domElements.js'
import {createCard} from './cards.js'

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    const popupCloseBtn = popup.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', event => closePopup(popup));

    const popupContent = popup.querySelector('.popup__content');
    popupContent.addEventListener('click', event => {
         event.stopPropagation();
    });

    //! Кроме того, что мы показали окно надо еще навесить скрытий по Esc
    document.addEventListener('keyup', closePopupbyEsc);
}

export function closePopup(popup){
    popup.closest('.popup').classList.remove('popup_is-opened');
    //! Удаляем подписку при закрытии по требованию ТЗ
    document.removeEventListener('keyup', closePopupbyEsc);
}


export function closeOpenedPopupByOverlay(event){
    const popup = event.target.closest('.popup');
    if(popup !== null && popup.classList.contains('popup_is-opened')){
        closePopup(popup);
    }
}

export function closeOpenedPopup(event){
    const popup = document.querySelector('.popup_is-opened');
    if(popup !== null){
        closePopup(popup);
    }
}


function setupWindow(popupClass, openButonClass){
    const popupWindow = document.querySelector(popupClass);
    const popupCloseBtn = popupWindow.querySelector('.popup__close');
    const openBtn = document.querySelector(openButonClass);

    
    openBtn.addEventListener('click', (event)=>{
        popupWindow.classList.add('popup_is-opened');
    });

    popupCloseBtn.addEventListener('click', (event)=>{
        popupWindow.classList.remove('popup_is-opened');
    });
}

function closePopupbyEsc(event){
    console.log(event);
    if(event.key === "Escape"){
        closeOpenedPopup();
    }
}

const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const nameInput = formEditProfile.name;
    const jobInput = formEditProfile.description;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profileEditPopup);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault(); 

    const placeName = formAddCard['place-name'].value;
    const link = formAddCard.link.value;

    const cardElement = createCard(placeName, link);
    cardContainer.prepend(cardElement);

    closePopup(formAddCard);
}

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddCardFormSubmit);