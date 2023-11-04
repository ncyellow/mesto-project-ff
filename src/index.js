import './styles/index.css';
import {
  createCard,
  likeCard,
  deleteCard,
  initialCards,
} from './components/cards.js';
import {
  cardContainer,
  profileEditPopup,
  addCardPopup,
  profileTitle,
  profileDescription,
  formAddCard,
  formEditProfile,
  imagePopup,
  imagePopupSource,
  imagePopupCaption,
} from './components/domElements.js';
import { openPopup, closePopup } from './components/modal.js';

const popups = [
  {
    openBtn: document.querySelector('.profile__edit-button'),
    popupWnd: profileEditPopup,
    openCallBack: function () {
      formEditProfile.name.value = profileTitle.textContent;
      formEditProfile.description.value = profileDescription.textContent;
    },
  },
  {
    openBtn: document.querySelector('.profile__add-button'),
    popupWnd: addCardPopup,
    openCallBack: function () {
      //! По замечанию нам надо очищать инпут после успешного ввода, а не при любом клике на +
      //! По этому тут пусто
    },
  },
];

const forms = [
  {
    form: formEditProfile,
    popupWnd: profileEditPopup,
    closeCallBack: function () {
      const nameInput = formEditProfile.name;
      const jobInput = formEditProfile.description;

      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    },
  },
  {
    form: formAddCard,
    popupWnd: addCardPopup,
    closeCallBack: function () {
      const placeName = formAddCard['place-name'].value;
      const link = formAddCard.link.value;

      const cardInfo = buildCardInfo(placeName, link);
      const cardElement = createCard(cardInfo);
      cardContainer.prepend(cardElement);

      formAddCard['place-name'].value = '';
      formAddCard.link.value = '';
    },
  },
];

//! Прикладная логика обработки клика по картинке
function handleImageClick(event) {
  const image = event.target;

  imagePopupSource.src = image.src;
  imagePopupSource.alt = image.alt;

  imagePopupCaption.textContent = image.alt;
  openPopup(imagePopup);
}

//! Вспомогательная фунация создания объекта по на работе карточки
function buildCardInfo(name, link) {
  return {
    name: name,
    link: link,
    likeCard: likeCard,
    deleteCard: deleteCard,
    handleImageClick: handleImageClick,
  };
}

// Вывести карточки на страницу
function initalizeCards(cards) {
  // Контейнер ищем тут, чтобы искать только один раз
  cards.forEach((item) => {
    const cardInfo = buildCardInfo(item.name, item.link);
    const cardElement = createCard(cardInfo);
    cardContainer.appendChild(cardElement);
  });
}

//! Инициализация открытия закрытия попапов
function initPopups(popups) {
  popups.forEach(({ openBtn, popupWnd, openCallBack }) => {
    openBtn.addEventListener('click', (event) => {
      openPopup(popupWnd);
      openCallBack();
    });
  });

  const allPopups = document.querySelectorAll('.popup');
  allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });
}

//! Обработка ввода данных в форму
function initForms(forms) {
  forms.forEach(({ form, popupWnd, closeCallBack }) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      closePopup(popupWnd);
      closeCallBack();
    });
  });
}

initalizeCards(initialCards);
initPopups(popups);
initForms(forms);
