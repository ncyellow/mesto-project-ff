import { addLikeById, deleteCardById, removeLikeById } from './api';

// Функция удаления карточки
export function deleteCard(event) {
  const cardId = event.target.closest('.places__item').id;
  deleteCardById(cardId)
    .then((res) => {
      event.target.closest('.places__item').remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Обработка лайка
export function likeCard(event) {
  const card = event.target.closest('.places__item');
  const cardId = card.id;
  const spanLike = card.querySelector('.card__like-counter');
  const buttonLike = event.target;
  if (buttonLike.classList.contains('card__like-button_is-active')) {
    removeLikeById(cardId)
      .then((res) => {
        buttonLike.classList.toggle('card__like-button_is-active');
        updateLike(spanLike, res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLikeById(cardId)
      .then((res) => {
        buttonLike.classList.toggle('card__like-button_is-active');
        updateLike(spanLike, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function updateLike(spanLike, card) {
  spanLike.textContent = card.likes.length > 0 ? card.likes.length : '';
}

// Функция создания карточки
export function createCard(cardInfo, profileOwner) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  cardElement.setAttribute('id', cardInfo.card._id);
  cardElement.querySelector('.card__title').textContent = cardInfo.card.name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardInfo.card.link);
  cardImage.setAttribute('alt', cardInfo.card.name);

  cardImage.addEventListener('click', cardInfo.handleImageClick);

  const buttonDelete = cardElement.querySelector('.card__delete-button');
  if (cardInfo.card.owner._id == profileOwner._id) {
    buttonDelete.addEventListener('click', cardInfo.deleteCard);
  } else {
    buttonDelete.classList.add('card__delete-button_is-hidden');
  }
  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener('click', cardInfo.likeCard);

  const spanLike = cardElement.querySelector('.card__like-counter');
  updateLike(spanLike, cardInfo.card);

  const hasOwnerLike = cardInfo.card.likes.some(
    (like) => like._id == profileOwner._id
  );
  if (hasOwnerLike) {
    buttonLike.classList.toggle('card__like-button_is-active');
  }

  return cardElement;
}
