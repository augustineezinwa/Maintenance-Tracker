'use strict';

var emailField = document.getElementById('emailField');
var email = document.getElementById('emailField').value;

function renderInvalidEmail() {
  if (InputFieldsValidation.validateEmail(email)) {
    emailField.style.borderBottomColor = 'red';
  }
  emailField.style.borderBottomColor = '';
}

emailField.addEventListener('keyup', renderInvalidEmail);