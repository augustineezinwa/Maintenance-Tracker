/**
 * @class Authentication
 *
 * @description validates clients on any protected page.
 */
class AuthenticateAccess {
  /**
        * @description -This method validates all client routes using tokens
        *
        * @returns {null} - returns to login page if validation fails.
        *
        * @memberOf AuthenticateAccess class
        * @static
        */
  static confirmAccess() {
    const token = localStorage.getItem('token');
    fetch('https://mt-tracker.herokuapp.com/api/v1/auth/validateToken', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        token
      }),
    })
      .then(response => response.json())
      .then((data) => {
        if (data.status !== 'success') {
          if (localStorage.getItem('requestData')) localStorage.removeItem('requestData');
          if (window.location.pathname === '/login1.html') return;
          window.location.pathname = '/login1.html';
        } else {
          if (data.data.adminStatus && ((window.location.pathname === '/login1.html') ||
          (window.location.pathname === '/userdashboard1.html'))) {
            window.location.pathname = '/admindashboard1.html';
          }
          if ((!data.data.adminStatus) && ((window.location.pathname === '/login1.html') ||
          (window.location.pathname === '/admindashboard1.html'))) {
            window.location.pathname = '/userdashboard1.html';
          }
        }
      })
      .catch(err => console.log(err));
  }
}
const { confirmAccess } = AuthenticateAccess;
confirmAccess();
