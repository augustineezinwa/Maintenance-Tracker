import fs from 'fs';
import path from 'path';
import atomus from 'atomus';
import chai from 'chai';

const should = chai.should();
const htmlString = fs.readFileSync('client/public/admindashboardTestRunner.html').toString('utf8');

let browser, $, trigger, func, email, windowObject,
  firstName, lastName, password, confirmPassword;

describe('Signout Tests', () => {
  it('should successfully signout and destroy token after user clicks signout', (done) => {
    browser = atomus()
      .html(htmlString)
      .external(path.join(__dirname, '..', '..', '/client/public/js/ToggleNavBar.js'))
      .external(path.join(__dirname, '..', '..', '/client/public/js/src/Authenticaton/Authentication.js'))
      .external(path.join(__dirname, '..', '..', '/client/public/js/src/Authenticaton/signout.js'))
      .external(path.join(__dirname, '..', '..', '/client/public/js/src/Render.js'))

      .ready((errors, window) => {
        $ = selector => window.document.getElementById(selector);
        func = className => window.eval(className);
        trigger = (element, event) => {
          const e = window.document.createEvent('UIEvents');
          e.initEvent(event, true, true);
          element.dispatchEvent(e);
        };
        const token = '34232323234#$#T#$E$RweR#@423';
        const signoutButton = $('signoutButton');
        const alertBox = $('alert-box');
        window.localStorage.setItem('token', token);
        window.location.pathname = 'login.html';
        trigger(signoutButton, 'click');
        window.localStorage.length.should.be.eql(0);
        alertBox.innerHTML.should.be.eql('You have signed out');
        done();
      });
  });
});
