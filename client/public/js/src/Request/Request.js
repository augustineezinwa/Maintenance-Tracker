/**
 * @class Request
 *
 * @description this class deals with every activity that has to do with requests.
 */
class Request {
  /**
          * @description -This method posts a request to the server fron the admin
          *
          * @param {event} - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static createRequest(event) {
    Render.renderDiv('requestBox', 'none');
    Render.renderLoader('loader', 'block', 'loader-text', 'Creating request...');
    const token = localStorage.getItem('token');
    event.preventDefault();
    fetch('https://mt-tracker.herokuapp.com/api/v1/users/requests', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        requestTitle: requestTitle.value,
        requestType: requestType.value,
        message: message.value,
        token
      }),
    })
      .then((response) => {
        if (response.status === 403 || response.status === 401) {
          window.location.pathname = '/login1.html';
        }
        return response.json();
      })
      .then((data) => {
        Render.renderLoader('loader', 'none', 'loader-text', '');

        if (data.status === 'success') {
          Render.renderAlert('alert-box', 'block', 'Your request has been forwarded', 'green');
          Render.renderDiv('requestBox', 'none');
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
          window.location.pathname = 'userdashboard1.html';
        } else {
          const alertMessage =
          data.data.message === 'error occured while writing to a table' ?
            'An error occurred while writing to server' : data.data.message;
          Render.renderDivColor('requestTitle', '');
          Render.renderDivColor('requestType', '', '');
          Render.renderAlert('alert-box', 'block', alertMessage, 'red');
          Render.renderDiv('requestBox', 'block');

          if (alertMessage.includes('Title')) {
            Render.renderDivColor('requestTitle', 'red');
          }
          if (alertMessage.includes('type')) {
            Render.renderDivColor('requestType', 'red', 'red');
          }
          if (alertMessage.includes('Message')) {
            Render.renderDivColor('message', 'red', 'red');
          }
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
        }
      })
      .catch(err => console.log(err));
  }
}
