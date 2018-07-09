
/**
 * @class InputFieldsValidaton
 *
 * @description Validates Input fields
 */
class InputFieldsValidation {
  /**
      * @description -This method validates the email field upon signup in Maintenance-Tracker signup form.
      *
      * @param {string} email - The data sent from the client.
      *
      * @returns {string} - returns the string to the render class.
      *
      * @memberOf InputFieldsValidation helper class
      * @static
      */
  static validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const output = emailRegex.test(email);
    if (output) return 0;
    return 'invalid email';
  }
  /**
      * @description -This method validates the password field upon signup in Maintenance-Tracker signup form.
      *
      * @param {string} password - The data sent from the client.
      *
      * @returns {string} - returns the string to the render class.
      *
      * @memberOf InputFieldsValidation helper class
      * @static
      */
  static validatePassword(password) {
    const passwordRegex = /^((?=.*[a-z])|(?=.*[A-Z]))(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/;
    if (passwordRegex.test(password)) {
      return 0;
    }
    return 'invalidPassword';
  }
  /**
      * @description -This method validates the first field upon signup in Maintenance-Tracker signup form.
      *
      * @param {string} name - The data sent from the client.
      *
      * @returns {string} - returns the string to the render class.
      *
      * @memberOf InputFieldsValidation helper class
      * @static
      */
  static validateName(name) {
    const nameRegex = /^(?=.*[a-zA-Z]+$)(?=.{3,})/;
    if (nameRegex.test(name)) {
      return 0;
    }
    return 'invalidName';
  }
}

