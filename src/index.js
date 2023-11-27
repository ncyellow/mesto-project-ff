import './styles/index.css';
import {
  createCard,
  likeCard,
  deleteCard,
} from './components/cards.js';
import {
  cardContainer,
  profileEditPopup,
  addCardPopup,
  profileImg,
  profileTitle,
  profileDescription,
  formAddCard,
  formEditProfile,
  imagePopup,
  imagePopupSource,
  imagePopupCaption,
  formEditAvatar,
  editAvatarPopup,
} from './components/domElements.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { 
  getInitialCards,
  getProfileInfo,
  updateProfileInfo,
  addNewCard,
  editAvatar
} from './components/api.js';

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
  {
    openBtn: document.querySelector('.profile__image'),
    popupWnd: editAvatarPopup,
    openCallBack: function () {
      //! ПО тз нет требования подставлять текущую картинку
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

      formEditProfile.save.textContent = 'Сохранение...';
      updateProfileInfo(nameInput.value, jobInput.value)
        .then(data => {
          profileTitle.textContent = nameInput.value;
          profileDescription.textContent = jobInput.value;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(()=>{
          formEditProfile.save.textContent = 'Сохранить';
        });

      
    },
  },
  {
    form: formAddCard,
    popupWnd: addCardPopup,
    closeCallBack: function () {
  
      const placeName = formAddCard['place-name'].value;
      const link = formAddCard.link.value;
      formAddCard.save.textContent = 'Сохранение...';
      addNewCard(placeName, link)
        .then(card => {
          const cardInfo = buildCardInfo(card);
          const cardElement = createCard(cardInfo, profileOwner);
          cardContainer.prepend(cardElement);
    
          formAddCard['place-name'].value = '';
          formAddCard.link.value = '';    
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          formAddCard.save.textContent = 'Сохранить';
        });
    },
  },
  {
    form: formEditAvatar,
    popupWnd: editAvatarPopup,
    closeCallBack: function () {
      const link = formEditAvatar.link.value;
      formAddCard.save.textContent = 'Сохранение...';
      editAvatar(link)
        .then(card => {
          profileImg.style.backgroundImage = `url(${card.avatar})`;
          formEditAvatar.link.value = '';
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          formAddCard.save.textContent = 'Сохранить';
        });
    },
  },
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


//! Тут мы будет хранить данные по нашему пользователю, он нужен чтобы помечать можно ли нам удалять карточки.
//! Так как мы можем удалять только свои карточки
let profileOwner;

//! Прикладная логика обработки клика по картинке
function handleImageClick(event) {
  const image = event.target;

  imagePopupSource.src = image.src;
  imagePopupSource.alt = image.alt;

  imagePopupCaption.textContent = image.alt;
  openPopup(imagePopup);
}

//! Вспомогательная фунация создания объекта по на работе карточки
function buildCardInfo(card) {
  return {
    card,
    likeCard,
    deleteCard,
    handleImageClick,
  };
}

// Вывести карточки на страницу
function initalizeCards(cards) {
  // Контейнер ищем тут, чтобы искать только один раз
  cards.forEach((item) => {
    const cardInfo = buildCardInfo(item);
    const cardElement = createCard(cardInfo, profileOwner);
    cardContainer.appendChild(cardElement);
  });
}

function initializeProfile(profileInfo){
  profileTitle.textContent = profileInfo.name;
  profileDescription.textContent = profileInfo.about;
  profileImg.style.backgroundImage = `url(${profileInfo.avatar})`;
}

// Вывести карточки на страницу
function fetchData() {
  //! Инициализация карточек
  const promiseCards = getInitialCards();
  const promiseProfile = getProfileInfo();
  Promise.all([promiseCards, promiseProfile])
    .then(([cards, profile]) => {
      initializeProfile(profile);
      profileOwner = profile;
      initalizeCards(cards);
    })
    .catch(err => {
      console.log(err);
    });
}

//! Инициализация открытия закрытия попапов
function initPopups(popups) {
  popups.forEach(({ openBtn, popupWnd, openCallBack }) => {
    openBtn.addEventListener('click', (event) => {
      openPopup(popupWnd);
      openCallBack();
      clearValidation(popupWnd, validationConfig);
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

fetchData();
initPopups(popups);
initForms(forms);
enableValidation(validationConfig); 