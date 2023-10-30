import './styles/index.css';
import {createCard, initialCards} from './components/cards.js'
import {cardContainer, popups} from './components/domElements.js'
import {closeOpenedPopupByOverlay, openPopup} from './components/modal.js'

// Вывести карточки на страницу
function initalizeCards(cards) {
    // Контейнер ищем тут, чтобы искать только один раз
    cards.forEach(item => {
        const cardElement = createCard(item.name, item.link);
        cardContainer.appendChild(cardElement);
    });
}

function initPopups(popups){
    document.addEventListener('click', closeOpenedPopupByOverlay);
    popups.forEach(item => {
        const openBtn = item.openBtn;
        const popupWindow = item.popupWnd;
        openBtn.addEventListener('click', event => openPopup(popupWindow));
    });
   
}

initalizeCards(initialCards);
initPopups(popups);

