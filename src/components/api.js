const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
    headers: {
      authorization: '3a46abb6-3fd9-484f-8456-1a0b06f37062',
      'Content-Type': 'application/json'
    }
  }


export function getInitialCards(){
    return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

