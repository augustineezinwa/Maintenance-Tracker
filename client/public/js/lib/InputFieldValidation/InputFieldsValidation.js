'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class InputFieldsValidaton
 *
 * @description Validates Input fields
 */
var InputFieldsValidation = function () {
  function InputFieldsValidation() {
    _classCallCheck(this, InputFieldsValidation);
  }

  _createClass(InputFieldsValidation, null, [{
    key: 'validateEmail',

    /**
        * @description -This method validates the email field upon signup in Maintenance-Tracker signup form.
        *
        * @param {string} email - The data sent from the client.
        *
        * @returns {string} - returns the string to the dom.
        *
        * @memberOf InputFieldsValidation helper class
        * @static
        */
    value: function validateEmail(email) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var output = emailRegex.test(email);
      if (output) return 0;
      return 'invalid email';
    }
  }]);

  return InputFieldsValidation;
}();