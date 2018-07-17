
/**
 * @class Authentication
 *
 * @description validates clients upon signup , sign in and logout.
 */
class Authentication {
  /**
        * @description -This method authenticates user upon signup
        *
        * @param {object} event - This is the event object that gets passed in.
        * @returns {null} - signs up user
        *
        * @memberOf Authentication class
        * @static
        */
  static signUp(event) {
    Render.renderDiv('signup-box', 'none');
    Render.renderLoader('loader', 'block', 'loader-text', 'signing you up...');
    event.preventDefault();
    fetch('https://mt-tracker.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:
        JSON.stringify({
          email: emailField.value,
          password: passwordField.value,
          confirmpassword: confirmPasswordField.value,
          firstName: firstNameField.value,
          lastName: lastNameField.value
        }),

    })
      .then((response) => {
        Render.renderLoader('loader', 'none', 'loader-text', '');
        if (response.status === 422) {
          Render.renderAlert('alert-box', 'block', 'Invalid Credentials', 'red');
          Render.renderDiv('signup-box', 'block');
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
          return response.json();
        }
        if (response.status === 409) {
          Render.renderAlert('alert-box', 'block', 'Email is already in use', 'red');
          Render.renderDiv('signup-box', 'block');
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
          return response.json();
        }
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.status === 'success') {
          Render.renderAlert('alert-box', 'block', 'Signup was successful', 'green');
          Render.renderDiv('signup-box', 'block');
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
          Render.renderDiv('signup-box', 'none');
          localStorage.setItem('token', data.data.token);
          const name = data.data.message.split(',')[0];
          localStorage.setItem('name', name);
          Render.renderLoader('loader', 'block', 'loader-text', 'redirecting');
          window.location.pathname = (name === 'Admin') ? '/admindashboard1.html' : '/userdashboard1.html';
        }
      })
      .catch(err => console.log(err));
  }
  /**
        * @description -This method authenticates user upon login
        *
        * @param {object} event - This is the event object that gets passed in.
        * @returns {null} - logins user
        *
        * @memberOf Authentication class
        * @static
        */
  static login(event) {
    Render.renderDiv('loginBox', 'none');
    Render.renderLoader('loader', 'block', 'loader-text', 'logging you in...');
    event.preventDefault();
    fetch('https://mt-tracker.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:
            JSON.stringify({
              email: loginEmailField.value,
              password: loginPasswordField.value,
            }),

    })
      .then((response) => {
        Render.renderLoader('loader', 'none', 'loader-text', '');
        if (response.status === 401) {
          Render.renderAlert('alert-box', 'block', 'Incorrect password', 'red');
          Render.renderDiv('loginBox', 'block');
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
          return response.json();
        }
        if (response.status === 404) {
          Render.renderAlert('alert-box', 'block', 'Email doesnt exist', 'red');
          Render.renderDiv('loginBox', 'block');
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
          return response.json();
        }
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.status === 'success') {
          Render.renderAlert('alert-box', 'block', 'Login was successful', 'green');
          Render.renderDiv('loginBox', 'block');
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
          Render.renderDiv('loginBox', 'none');
          localStorage.setItem('token', data.data.token);
          const name = data.data.message.split(',')[0];
          localStorage.setItem('name', name);
          Render.renderLoader('loader', 'block', 'loader-text', 'redirecting');
          window.location.pathname = (name === 'Admin') ? '/admindashboard1.html' : '/userdashboard1.html';
        }
      })
      .catch(err => console.log(err));
  }
  /**
        * @description -This method signs out user during signout process.
        *
        * @param {object} event - This is the event object that gets passed in.
        * @returns {null} - signs up user
        *
        * @memberOf Authentication class
        * @static
        */
  static signOut(event) {
    localStorage.removeItem('token');
    Render.renderAlert('alert-box', 'block', 'You have signed out', 'green');
    setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
    window.location.pathname = '/login1.html';
  }
}

