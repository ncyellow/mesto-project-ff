export function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    const popupCloseBtn = popup.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', event => closePopup(popup));

    const popupContent = popup.querySelector('.popup__content');
    popupContent.addEventListener('click', event => {
         event.stopPropagation();
    });

    //! Кроме того, что мы показали окно надо еще навесить скрытие по Esc
    document.addEventListener('keyup', closePopupbyEsc);
}

export function closePopup(popup){
    popup.closest('.popup').classList.remove('popup_is-opened');
    //! Удаляем подписку при закрытии по требованию ТЗ
    document.removeEventListener('keyup', closePopupbyEsc);
}


export function closeOpenedPopupByOverlay(event){
    const popup = event.target.closest('.popup');
    if(popup !== null && popup.classList.contains('popup_is-opened')){
        closePopup(popup);
    }
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