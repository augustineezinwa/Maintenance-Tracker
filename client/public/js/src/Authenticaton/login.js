const { login } = Authentication;
const loginEmailField = document.getElementById('loginEmailField');
const loginPasswordField = document.getElementById('loginPasswordField');

document.getElementById('loginButton').addEventListener('click', login);
