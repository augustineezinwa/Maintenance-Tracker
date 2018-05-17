
/**
 * @class InputFieldsValidaton
 * @description Validates Input fields
 */
class InputFieldsValidation {
  /**
    * @description -This method validates input fields in Maintenance-Tracker forms.
    * @param {string} TextField - The data sent from the middleware.
    *
    * @returns {object} - returns the validated data to the middleware.
    *
    * @memberOf InputFieldsValidation helper class
    * @static
    */
  static validateStatus(TextField) {
    const message = typeof TextField === 'string' ? TextField.trim() : '';
    if (message === 'success' || message === 'fail') {
      return message;
    }
    return 0;
  }
  /**
    * @description -This method validates input fields in Maintenance forms.
    * @param {string} TextField - The data sent from the middleware.
    *
    * @returns {object} - returns the validated data to the middleware.
    *
    * @memberOf InputFieldsValidation helper class
    * @static
    */
  static validateRequestMessage(TextField) {
    let message;
    message = typeof TextField === 'string' ? TextField.trim() : '';
    message = message.length === 0 ? 'Message is invalid or empty' : message;
    message = message.length > 50 ? 'Message is too long' : message;
    message = message.length < 5 ? 'Message is too short' : message;
    message = (message.includes('@@') || message.includes('??') ||
    message.includes('%%') || message.includes('&&\n')) ||
    message.includes('$$') || /^\d+$/.test(message) ?
      'Message contains invalid syntax' : message;
    message = (message === 'Message is invalid or empty' ||
    message === 'Message is too long' ||
    message === 'Message is too short' ||
    message === 'Message contains invalid syntax')
      ? message : { status: 'success', data: message };
    return message;
  }
}
export default InputFieldsValidation;
