import fs from 'fs';
import path from 'path';
import atomus from 'atomus';
import chai from 'chai';

const should = chai.should();
const htmlString = fs.readFileSync('client/public/signupTestRunner.html').toString('utf8');
let browser, $, trigger, func;
describe('Signup form Tests', () => {
  it('validating signup form', (done) => {
    browser = atomus()
      .html(htmlString)
      .external(path.join(__dirname, '..', '..', '/client/public/js/ToggleNavBar.js'))
      .external(path.join(__dirname, '..', '..', '/client/public/js/src/InputFieldValidation/InputFieldsValidation.js'))
      .external(path.join(__dirname, '..', '..', '/client/public/js/src/Authenticaton/Authentication.js'))
      .external(path.join(__dirname, '..', '..', '/client/public/js/src/Render.js'))
      .external(path.join(__dirname, '..', '..', '/client/public/js/src/InputFieldValidation/index.js'))

      .ready((errors, window) => {
        $ = selector => window.document.getElementById(selector);
        func = className => window.eval(className);
        trigger = (element, event) => {
          const e = window.document.createEvent('UIEvents');
          e.initEvent(event, true, true);
          element.dispatchEvent(e);
        };

        const email = $('emailField');
        const emailError = $('displayEmailError');
        email.value = 'emeka';
        trigger(email, 'keyup');
        emailError.innerHTML.should.be.eql('* Invalid email');
        email.style.borderBottomColor.should.be.eql('red');
        email.value = 'augustineezinwa@gmail.com';
        trigger(email, 'keyup');
        emailError.innerHTML.should.be.eql('');
        email.style.borderBottomColor.should.be.eql('');

        done();
      });
  });

  it('validating password field', (done) => {
    const password = $('passwordField');
    const passwordError = $('displayPasswordError');
    const notifyErrorPassword = $('notify-error-password');
    const notifyNoErrorPassword = $('notify-no-error-password');

    password.value = 'fish';
    trigger(password, 'keyup');
    passwordError.innerHTML.should.be
      .eql('* Password must have at least one of @#$%*&amp;,\n       a number, a letter and minimum length of 5');
    passwordError.style.color.should.be.eql('red');
    password.style.borderBottomColor.should.be.eql('red');
    notifyErrorPassword.style.display.should.be.eql('inline');
    notifyNoErrorPassword.style.display.should.be.eql('none');

    password.value = 'donekey#$002';
    trigger(password, 'keyup');
    passwordError.innerHTML.should.be.eql('');
    password.style.borderBottomColor.should.be.eql('');
    notifyNoErrorPassword.style.display.should.be.eql('inline');
    notifyErrorPassword.style.display.should.be.eql('none');
    done();
  });

  it('validating confirm password field', (done) => {
    const confirmPassword = $('confirmPasswordField');
    const confirmPasswordError = $('displayConfirmPasswordError');
    const notifyErrorConfirmPassword = $('notify-error-confirmpassword');
    const notifyNoErrorConfirmPassword = $('notify-no-error-confirmpassword');

    confirmPassword.value = 'fish';
    trigger(confirmPassword, 'keyup');
    confirmPasswordError.innerHTML.should.be
      .eql('* Password does not match');
    confirmPasswordError.style.color.should.be.eql('red');
    confirmPassword.style.borderBottomColor.should.be.eql('red');
    notifyErrorConfirmPassword.style.display.should.be.eql('inline');
    notifyNoErrorConfirmPassword.style.display.should.be.eql('none');

    confirmPassword.value = 'donekey#$002';
    trigger(confirmPassword, 'keyup');
    confirmPasswordError.innerHTML.should.be.eql('');
    confirmPassword.style.borderBottomColor.should.be.eql('');
    notifyNoErrorConfirmPassword.style.display.should.be.eql('inline');
    notifyErrorConfirmPassword.style.display.should.be.eql('none');
    done();
  });

  it('validating confirm password field', (done) => {
    const confirmPassword = $('confirmPasswordField');
    const confirmPasswordError = $('displayConfirmPasswordError');
    const notifyErrorConfirmPassword = $('notify-error-confirmpassword');
    const notifyNoErrorConfirmPassword = $('notify-no-error-confirmpassword');

    confirmPassword.value = 'fish';
    trigger(confirmPassword, 'keyup');
    confirmPasswordError.innerHTML.should.be
      .eql('* Password does not match');
    confirmPasswordError.style.color.should.be.eql('red');
    confirmPassword.style.borderBottomColor.should.be.eql('red');
    notifyErrorConfirmPassword.style.display.should.be.eql('inline');
    notifyNoErrorConfirmPassword.style.display.should.be.eql('none');

    confirmPassword.value = 'donekey#$002';
    trigger(confirmPassword, 'keyup');
    confirmPasswordError.innerHTML.should.be.eql('');
    confirmPassword.style.borderBottomColor.should.be.eql('');
    notifyNoErrorConfirmPassword.style.display.should.be.eql('inline');
    notifyErrorConfirmPassword.style.display.should.be.eql('none');
    done();
  });

  it('validating firstname field', (done) => {
    const firstName = $('firstNameField');
    const firstNameError = $('displayFirstNameError');
    const notifyErrorFirstName = $('notify-error-firstname');
    const notifyNoErrorFirstName = $('notify-no-error-firstname');

    firstName.value = 'fi$$';
    trigger(firstName, 'keyup');
    firstNameError.innerHTML.should.be
      .eql('* Invalid first name');
    firstNameError.style.color.should.be.eql('red');
    firstName.style.borderBottomColor.should.be.eql('red');
    notifyErrorFirstName.style.display.should.be.eql('inline');
    notifyNoErrorFirstName.style.display.should.be.eql('none');

    firstName.value = 'Augustine';
    trigger(firstName, 'keyup');
    firstNameError.innerHTML.should.be.eql('');
    firstName.style.borderBottomColor.should.be.eql('');
    notifyNoErrorFirstName.style.display.should.be.eql('inline');
    notifyErrorFirstName.style.display.should.be.eql('none');
    done();
  });

  it('validating lastname field', (done) => {
    const lastName = $('lastNameField');
    const lastNameError = $('displayLastNameError');
    const notifyErrorLastName = $('notify-error-lastname');
    const notifyNoErrorLastName = $('notify-no-error-lastname');

    lastName.value = 'fi$$';
    trigger(lastName, 'keyup');
    lastNameError.innerHTML.should.be
      .eql('* Invalid last name');
    lastNameError.style.color.should.be.eql('red');
    lastName.style.borderBottomColor.should.be.eql('red');
    notifyErrorLastName.style.display.should.be.eql('inline');
    notifyNoErrorLastName.style.display.should.be.eql('none');

    lastName.value = 'Augustine';
    trigger(lastName, 'keyup');
    lastNameError.innerHTML.should.be.eql('');
    lastName.style.borderBottomColor.should.be.eql('');
    notifyNoErrorLastName.style.display.should.be.eql('inline');
    notifyErrorLastName.style.display.should.be.eql('none');
    done();
  });

  it('testing  notification alerts ', (done) => {
    done();
  });

  it('testing email validator function', (done) => {
    func('InputFieldsValidation').validateEmail('augustineezinwa@gmail.com')
      .should.be.eql(0);
    func('InputFieldsValidation').validateEmail('augus@@@yaho..com')
      .should.be.eql('invalid email');
    done();
  });
  it('testing password validator function', (done) => {
    func('InputFieldsValidation').validatePassword('Inief*')
      .should.be.eql('invalidPassword');
    func('InputFieldsValidation').validatePassword('Inieefjunior0%')
      .should.be.eql(0);
    done();
  });
  it('testing name validator function', (done) => {
    func('InputFieldsValidation').validateName('Augustine*')
      .should.be.eql('invalidName');
    func('InputFieldsValidation').validateName('Augustine')
      .should.be.eql(0);
    done();
  });
});
