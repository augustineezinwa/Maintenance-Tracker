/**
 * @class User
 *
 * @description this class fetches the name attached to any request
 */
class User {
  /**
            * @description -This method gets the name attached to any request
            *
            * @param {object} event - This is the event object passed to the method.
            * @returns {null} -
            *
            * @memberOf Request class
            * @static
            */
  static getName() {
    event.preventDefault();
    const requestData = localStorage.getItem('requestData');
    const token = localStorage.getItem('token');
    const requestId = event.target.attributes[1].value;
    const particularRequest = requestData.filter(x => +x.id === +requestId);
    const userId = particularRequest[0].userid;
    fetch('localhost:2020/api/v1/users/{userId}', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: `${token}`
      }
    })
      .then((response) => {
        if (response.status === 403 || response.status === 401) {
          window.location.localStorage.removeItem('allRequestData');
          window.location.pathname = '/login1.html';
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'fail') {
          Render.renderAlert('getName', 'block', 'Error occurred while fetching name');
        } else {
          Render.renderAlert('getName', 'block', `${data.data.firstname} ${data.data.lastname}`);
        }
      })
      .catch((err) => {
        Render.renderAlert('getName', 'block', 'error!');
        console.log(err);
      });
  }
}
