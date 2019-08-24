// Скрипт оправки формы
// The script is uploading a form

let message = {
    loading: 'Загрузка...',
    success: 'Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};
let form = document.querySelector('#form'),
    input = form.getElementsByTagName('input'),
    // Создаем новый див для вывода сообщения на странице
    // Create a new diva to display the message on the page
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

form.addEventListener('submit', function (event) {
    // Отменяем стандарное поведение браузера при нажатии на кнопку 
    // Cancel the standard behavior of the browser when you click on the button
        event.preventDefault();
        form.appendChild(statusMessage);

        // Настройки сервера
        // Server setting
        let request = new XMLHttpRequest();
        request.open('POST', '/server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // Создаем переменную для получения данных ввода пользоватея в форму
        // Create a variable to get user input data in the form
        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200){
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        // Очистка Input
        // Cleaning Input
        for (let i = 0; i < input.length; i++) {
            input.value = '';
        }

    });