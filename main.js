const registrationForm = document.getElementById("registrationForm");
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");
const userInfoElement = document.getElementById("userInfo");
const countdownElement = document.getElementById("countdown");
const countdownTimeElement = document.getElementById("countdownTime");

// Функция проверки введенных данных
function validateForm() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const gender = document.getElementById("gender").value;
  const terms = document.getElementById("terms").checked;

  if (username === "") {
    alert("Пожалуйста, введите имя пользователя");
    return false;
  }

  if (password === "") {
    alert("Пожалуйста, введите пароль");
    return false;
  }

  if (confirmPassword === "") {
    alert("Пожалуйста, подтвердите пароль");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Пароли не совпадают");
    return false;
  }

  if (gender === "") {
    alert("Пожалуйста, выберите пол");
    return false;
  }

  if (!terms) {
    alert("Пожалуйста, согласитесь с условиями");
    return false;
  }

  return true;
}

// Функция обработки отправки формы
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const userData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    gender: document.getElementById("gender").value,
  };

  // Сохранение данных пользователя в localStorage
  localStorage.setItem('userData', JSON.stringify(userData));

  // Запуск обратного отсчета
  let countdown = parseInt(countdownTimeElement.value);
  if (countdown > 0) {
    countdownElement.innerHTML = countdown;

    let intervalId = setInterval(function () {
      countdown--;
      countdownElement.innerHTML = countdown;

      if (countdown === 0) {
        clearInterval(intervalId);
        countdownElement.innerHTML = "Обратный отсчет завершен!";

        // Отображение информации о пользователе
        userInfoElement.innerHTML = `
          <h2>Регистрация успешна!</h2>
          <p>Имя пользователя: ${userData.username}</p>
          <p>Пароль: ${userData.password}</p> <p>Пол: ${userData.gender}</p>
        `;
      }
    }, 1000);
  } else {
    // Отображение информации о пользователе сразу
    userInfoElement.innerHTML = `
      <h2>Регистрация успешна!</h2>
      <p>Имя пользователя: ${userData.username}</p>
      <p>Пароль: ${userData.password}</p> <p>Пол: ${userData.gender}</p>
    `;
  }

  // Очистка формы (по желанию)
  registrationForm.reset();
});

// Функция переключения видимости пароля
togglePassword.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePassword.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
  }
});

// Загрузка данных пользователя из localStorage при загрузке страницы
const storedUserData = localStorage.getItem('userData');
if (storedUserData) {
  const parsedUserData = JSON.parse(storedUserData);
  userInfoElement.innerHTML = `
    <h2>Данные пользователя:</h2>
    <p>Имя пользователя: ${parsedUserData.username}</p>
    <p>Пароль: ${parsedUserData.password}</p> <p>Пол: ${parsedUserData.gender}</p>
  `;
}
