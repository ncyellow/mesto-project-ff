import {imagePopup} from "./domElements"
import {openPopup} from "./modal";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

// Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.places__item').remove();
}

// Обработка лайка
function likeCard(event){
  event.target.classList.toggle('card__like-button_is-active');
}


// Функция создания карточки
export function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardImage.addEventListener('click', event => {
    const image = imagePopup.querySelector('.popup__image');
    image.src = link;
    image.alt = name;
    
    const caption = imagePopup.querySelector('.popup__caption');
    caption.textContent = name;
    openPopup(imagePopup);
  });

  const buttonDelete = cardElement.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', deleteCard);

  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener('click', likeCard);

  // по требованиям задания функция возвращает DOM элемент карточки
  return cardElement;
}