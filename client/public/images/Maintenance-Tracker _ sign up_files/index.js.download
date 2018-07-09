const emailField = document.getElementById('emailField');
const passwordField = document.getElementById('passwordField');
const confirmPasswordField = document.getElementById('confirmPasswordField');
const firstNameField = document.getElementById('firstNameField');
const lastNameField = document.getElementById('lastNameField');
const displayGeneralErrors = document.getElementById('general-errors');

const connectionUrl = 'localhost:2020';
const { validateEmail, validatePassword, validateName } = InputFieldsValidation;
const {
  renderInvalidEmail, renderInvalidPassword, renderInvalidConfirmPassword, renderInvalidFirstName,
  renderInvalidLastName, renderInvalidFields
} = Render;
const { signUp } = Authentication;

emailField.addEventListener('keyup', renderInvalidEmail);
passwordField.addEventListener('keyup', renderInvalidPassword);
confirmPasswordField.addEventListener('keyup', renderInvalidConfirmPassword);
firstNameField.addEventListener('keyup', renderInvalidFirstName);
lastNameField.addEventListener('keyup', renderInvalidLastName);
document.getElementById('signupButton').addEventListener('click', signUp);
