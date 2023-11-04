export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Функция удаления карточки
export function deleteCard(event) {
  event.target.closest('.places__item').remove();
}

// Обработка лайка
export function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
export function createCard(cardInfo) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardInfo.name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardInfo.link);
  cardImage.setAttribute('alt', cardInfo.name);

  cardImage.addEventListener('click', cardInfo.handleImageClick);

  const buttonDelete = cardElement.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', cardInfo.deleteCard);

  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener('click', cardInfo.likeCard);

  return cardElement;
}
