/* Переменные */
const form = document.querySelector('.form'),
    modal = document.querySelector('.modal'),
    modalButtonClose = document.querySelector('.modal__close'),
    modalList = document.querySelector('.modal__list'),
    username = document.getElementById('name'),
    email = document.getElementById('email'),
    heading = document.querySelector('.heading'),
    phone = document.getElementById('phone'),
    buttonsSubmit = document.querySelector('.buttonSubmit'),
    backToMainPage = document.querySelector('.backToMain');

/* Регулярные выражения для полей */
const phoneRegExp = /^([0-9\+]{0,3})\s?\(([0-9]{1,6})\)\s?([0-9\-]{1,9})$/,
    emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    usernameRegExp = /^[A-ZА-ЯЁ]+$/i;

/* Проверка валидности поля с индикацией */
function checkValidity(input, re) {
    if (re.test(input.value.trim())) {
        input.parentElement.className = 'inputbox';
        return true;
    } else {
        input.parentElement.className = 'inputbox error';
    }
    return false;
}

/* Проверка валидности всех полей */
function checkAllFields() {
    checkValidity(username, usernameRegExp);
    checkValidity(email, emailRegExp);
    checkValidity(phone, phoneRegExp);
}

function validate() {
    if (checkValidity(username, usernameRegExp) && checkValidity(phone, phoneRegExp) && checkValidity(email, emailRegExp)) {
        return true;
    }
    return false;
}


/* Вывод имени */
function writeName(name) {
    heading.innerText = `Спасибо что уделили нам время, ${name}!`;
}

/* Активация модального окна */
function activateModal() {
    modal.classList.add('active');
}

/* Закрытие модального окна */
function closeModal() {
    modal.classList.remove('active');
    modalList.innerHTML = '';
}

/* Проверка всех полей во время ввода */
[username, phone, email].forEach(input => {
    input.addEventListener('input', () => {
        checkAllFields();
    });
});

/* Переход на страницу */

function setActivePage(page) {
    document.querySelector('[data-page].active').classList.remove('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
}

modalButtonClose.addEventListener('click', () => closeModal());

backToMainPage.addEventListener('click', () => setActivePage('form'));

/* 
    По нажатию проверяем валидность введённых данных
    Если условие выполняется - переход на следующую страницу и вывод благодарности с именем из поля ввода имени
    Если условие не выполняется - активация модального окна со списком не валидных полей
*/
buttonsSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    checkAllFields();
    if (validate()) {
        setActivePage('next');
        writeName(username.value);
    } else {
        const allErrorInputs = document.querySelectorAll('.inputbox.error input');
        activateModal();
        allErrorInputs.forEach(item => {
            modalList.innerHTML += `<p>- Введите корректные данные в поле ${item.getAttribute('id')}</p>`;
        });
    }
});