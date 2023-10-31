import './styles/index.css';
import {createCard, likeCard, deleteCard, initialCards} from './components/cards.js'
import {cardContainer, profileEditPopup, addCardPopup, popups, profileTitle, profileDescription, formAddCard, formEditProfile} from './components/domElements.js'
import {closeOpenedPopupByEvent, openPopup, closePopup} from './components/modal.js'

// Вывести карточки на страницу
function initalizeCards(cards) {
    // Контейнер ищем тут, чтобы искать только один раз
    cards.forEach(item => {
        const cardElement = createCard(item.name, item.link, likeCard, deleteCard, openPopup);
        cardContainer.appendChild(cardElement);
    });
}

//! Инициализация открытия закрытия попапов
function initPopups(popups){
    document.addEventListener('click', closeOpenedPopupByEvent);
    popups.forEach(item => {
        const openBtn = item.openBtn;
        const popupWindow = item.popupWnd;
        openBtn.addEventListener('click', event => openPopup(popupWindow));
    });
   
}

//! Заполнение формы профиля
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const nameInput = formEditProfile.name;
    const jobInput = formEditProfile.description;

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profileEditPopup);
}


//! Обработка создания новой карточки по кнопке
function handleAddCardFormSubmit(evt) {
    evt.preventDefault(); 

    const placeName = formAddCard['place-name'].value;
    const link = formAddCard.link.value;

    const cardElement = createCard(placeName, link, likeCard, deleteCard, openPopup);
    cardContainer.prepend(cardElement);
    closePopup(addCardPopup);
}

function initForms(){
    formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
    formAddCard.addEventListener('submit', handleAddCardFormSubmit);
}


initalizeCards(initialCards);
initPopups(popups);
initForms();