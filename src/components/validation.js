let validationOptions = {}

export function enableValidation(options){
    validationOptions = options;
    const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
}

export function clearValidation(formElement, validationConfig){
    const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    const buttonElement = formElement.querySelector(validationOptions.submitButtonSelector);
    inputList.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement);
    });
    toggleButtonState(inputList, buttonElement);    
}


function setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    const buttonElement = formElement.querySelector(validationOptions.submitButtonSelector);
  
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
}


function hasInvalidInput(inputList){
    return inputList.some((input)=>{
        return !input.validity.valid;
    });
}
  
function toggleButtonState(inputList, buttonElement){
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add(validationOptions.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validationOptions.inactiveButtonClass);
    }
}

function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationOptions.inputErrorClass);
    errorElement.classList.remove(validationOptions.errorClass);
    errorElement.textContent = '';
}
  
function checkInputValidity(formElement, inputElement){
    if (inputElement.validity.patternMismatch) {
        showInputError(formElement, inputElement, inputElement.dataset.errorMessage);
    } else if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}


function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationOptions.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationOptions.errorClass);
} 
