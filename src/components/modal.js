export function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    //! Вешаем закрытие на кнопку
    const popupCloseBtn = popup.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', closeOpenedPopupByEvent);

    const popupContent = popup.querySelector('.popup__content');
    popupContent.addEventListener('click', stopPropagation);

    //! Кроме того, что мы показали окно надо еще навесить скрытие по Esc
    document.addEventListener('keyup', closePopupbyEsc);
}

//! Закрытие окна и отписка от всех событий
export function closePopup(popup){
    popup.classList.remove('popup_is-opened');

    const popupCloseBtn = popup.querySelector('.popup__close');
    popupCloseBtn.removeEventListener('click', closeOpenedPopupByEvent);

    const popupContent = popup.querySelector('.popup__content');
    popupContent.removeEventListener('click', stopPropagation);

    document.removeEventListener('keyup', closePopupbyEsc);
}

export function closeOpenedPopupByEvent(event){
    const popup = event.target.closest('.popup');
    if(popup !== null && popup.classList.contains('popup_is-opened')){
        closePopup(popup);
    }
}

//! Блокировка проброса событий к родитилям
function stopPropagation(event){
    event.stopPropagation();
}

//! Вспомогательная фунация для закрытия открытого popup 
function closeOpenedPopup(event){
    const popup = document.querySelector('.popup_is-opened');
    if(popup !== null){
        closePopup(popup);
    }
}

//! Вспомогательная фунация для закрытия открытого popup по Escape 
function closePopupbyEsc(event){
    if(event.key === "Escape"){
        closeOpenedPopup();
    }
}