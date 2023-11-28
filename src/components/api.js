const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
  headers: {
    authorization: '3a46abb6-3fd9-484f-8456-1a0b06f37062',
    'Content-Type': 'application/json',
  },
};

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponseData);
}

export function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponseData);
}

export function updateProfileInfo(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then(getResponseData);
}

export function editAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(getResponseData);
}

export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(getResponseData);
}

export function deleteCardById(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(getResponseData);
}

export function addLikeById(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT',
  }).then(getResponseData);
}

export function removeLikeById(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(getResponseData);
}

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}
