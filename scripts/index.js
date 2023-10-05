// Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.places__item').remove();
}

// Функция создания карточки
function createCard(name, link, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = name;

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);

    const buttonDelete = cardElement.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', deleteCard);

    // по требованиям задания функция возвращает DOM элемент карточки
    return cardElement;
}

// Вывести карточки на страницу
function initalizeCards(cards) {
    // Контейнер ищем тут, чтобы искать только один раз
    const cardContainer = document.querySelector('.places__list');
    cards.forEach(item => {
        const cardElement = createCard(item.name, item.link, deleteCard);
        cardContainer.appendChild(cardElement);
    });
}

initalizeCards(initialCards);