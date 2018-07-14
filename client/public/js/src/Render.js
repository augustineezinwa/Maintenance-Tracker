
/**
 * @class Render
 *
 * @description renders the validations to DOM.
 */
class Render {
  /**
      * @description -This method renders the validation signs on the signup email form field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidEmail() {
    const email = emailField.value;
    Render.renderValidationSign('notify-error', 'emailField', 'none', '', '');
    Render.renderValidationMessage('displayEmailError', 'none', '');

    if (validateEmail(email)) {
      Render.renderValidationSign('notify-error', 'emailField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error', 'emailField', 'none', '', 'red');
      Render.renderValidationMessage('displayEmailError', 'block', '* Invalid email');
      passwordField.disabled = 'true';
      confirmPasswordField.disabled = 'true';
      firstNameField.disabled = 'true';
      lastNameField.disabled = 'true';
    } else {
      Render.renderValidationSign('notify-no-error', 'emailField', 'inline', 'lightgreen', '');
      passwordField.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation signs on the signup password form field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidPassword() {
    const password = passwordField.value;
    Render.renderValidationSign('notify-error-password', 'passwordField', 'none', '', '');
    Render.renderValidationMessage('displayPasswordError', 'none', '');

    if (validatePassword(password)) {
      Render.renderValidationSign('notify-error-password', 'passwordField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error-password', 'passwordField', 'none', '', 'red');
      Render.renderValidationMessage('displayPasswordError', 'block', `* Password must have at least one of @#$%*&,
       a number, a letter and minimum length of 5`);
      confirmPasswordField.disabled = 'true';
      firstNameField.disabled = 'true';
      lastNameField.disabled = 'true';
    } else {
      Render.renderValidationSign('notify-no-error-password', 'passwordField', 'inline', 'lightgreen', '');
      confirmPasswordField.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation signs on the signup password form field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidConfirmPassword() {
    const confirmPassword = confirmPasswordField.value;
    const password = passwordField.value;
    Render.renderValidationSign('notify-error-confirmpassword', 'confirmPasswordField', 'none', '', '');
    Render.renderValidationMessage('displayConfirmPasswordError', 'none', '');

    if (confirmPassword !== password) {
      Render.renderValidationSign('notify-error-confirmpassword', 'confirmPasswordField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error-confirmpassword', 'confirmPasswordField', 'none', '', 'red');
      Render.renderValidationMessage('displayConfirmPasswordError', 'block', '* Password does not match');
      firstNameField.disabled = 'true';
      lastNameField.disabled = 'true';
    } else {
      Render.renderValidationSign('notify-no-error-confirmpassword', 'confirmPasswordField', 'inline', 'lightgreen', '');
      firstNameField.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation signs on the signup firstName field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidFirstName() {
    const firstName = firstNameField.value;
    Render.renderValidationSign('notify-error-firstname', 'firstNameField', 'none', '', '');
    Render.renderValidationMessage('displayFirstNameError', 'none', '');
    if (validateName(firstName)) {
      Render.renderValidationSign('notify-error-firstname', 'firstNameField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error-firstname', 'firstNameField', 'none', '', 'red');
      Render.renderValidationMessage('displayFirstNameError', 'block', '* Invalid first name');
      lastNameField.disabled = 'true';
    } else {
      Render.renderValidationSign('notify-no-error-firstname', 'lastNameField', 'inline', 'lightgreen', '');
      lastNameField.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation signs on the signup lastName field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidLastName() {
    const lastName = lastNameField.value;
    Render.renderValidationSign('notify-error-lastname', 'lastNameField', 'none', '', '');
    Render.renderValidationMessage('displayLastNameError', 'none', '');
    if (validateName(lastName)) {
      Render.renderValidationSign('notify-error-lastname', 'lastNameField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error-lastname', 'lastNameField', 'none', '', 'red');
      Render.renderValidationMessage('displayLastNameError', 'block', '* Invalid last name');
    } else {
      Render.renderValidationSign('notify-no-error-lastname', 'lastNameField', 'inline', 'lightgreen', '');
      signupButton.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation message on the signup lastName field.
      *
      * @param {string} ElementId -This is the html element that needs to be rendered
      * @param {string} toggleDisplay -This is the display css style that gets toggled
      * @param {string} message  -This is message that is to be rendered to the DOM
      *
      * @returns {null} - writes and display message to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderValidationMessage(ElementId, toggleDisplay, message) {
    const divElement = document.getElementById(ElementId);
    divElement.style.display = toggleDisplay;
    divElement.style.float = 'left';
    divElement.style.textAlign = 'left';
    divElement.style.color = 'red';
    divElement.innerHTML = message;
  }
  /**
      * @description -This method renders the validation message on the signup form fields.
      *
      * @param {string} ElementId -This is the html element that needs to be rendered
      * @param {string} formFieldId -This is the html element(sign) that needs to be rendered.
      * @param {string} toggleDisplay -This is the css style that handles the display of the validation sign
      * @param {string} signColor - The color of the validation sign assuming a field is filled correctly
      * @param {string} formFieldColor  -This is color of the formfield if it is wrongly validated
      *
      * @returns {null} - writes and display message to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderValidationSign(ElementId, formFieldId, toggleDisplay, signColor, formFieldColor = '') {
    const divElement = document.getElementById(ElementId);
    const formField = document.getElementById(formFieldId);
    formField.style.width = '90%';
    formField.style.borderBottomColor = formFieldColor;
    divElement.style.display = toggleDisplay;
    divElement.style.color = signColor;
  }
  /**
      * @description -This method renders the loader animation during asynchronous events.
      *
      * @param {string} ElementId -This is the html element that needs to render the loader
      * @param {string} toggleDisplay -This is the css style that handles the display of the loader animation.
      * @param {string} loaderTextId - This is the div id that holds the loader text
      * @param {string} loaderText  -This is the text displayed by the loader to the user while waiting.
      *
      * @returns {null} - writes and display message to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderLoader(ElementId, toggleDisplay, loaderTextId, loaderText) {
    const divElement = document.getElementById(ElementId);
    const loaderTextElement = document.getElementById(loaderTextId);
    divElement.style.display = toggleDisplay;
    divElement.style.marginTop = '20%';
    loaderTextElement.innerHTML = loaderText;
  }
  /**
      * @description -This method renders the alerts to users on maintenance-tracker.
      *
      * @param {string} ElementId -This is the html element that needs to be displayed
      * @param {string} toggleDisplay -This is the css style that handles the display of the div element
      * @param {string} text -This is the text that will be displayed in this div.
      * @param {string} bgColor -This is the text that will be displayed in this div.
      * @returns {null} - writes and display message to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderAlert(ElementId, toggleDisplay, text = '', bgColor = '') {
    const divElement = document.getElementById(ElementId);
    divElement.style.display = toggleDisplay;
    divElement.innerHTML = text;
    divElement.style.backgroundColor = bgColor;
  }
  /**
      * @description -This method renders a div by id.
      *
      * @param {string} ElementId -This is the html element that needs to be displayed
      * @param {string} toggleDisplay -This is the css style that handles the display of the div element
      * @returns {null} - displays or hide divs in the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderDiv(ElementId, toggleDisplay) {
    const divElement = document.getElementById(ElementId);
    divElement.style.display = toggleDisplay;
  }
}

