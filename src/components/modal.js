export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  //! Кроме того, что мы показали окно надо еще навесить скрытие по Esc
  document.addEventListener('keyup', closePopupbyEsc);
}

//! Закрытие окна и отписка от всех событий
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closePopupbyEsc);
}

//! Вспомогательная фунация для закрытия открытого popup по Escape
function closePopupbyEsc(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    if (popup !== null) {
      closePopup(popup);
    }
  }
}
