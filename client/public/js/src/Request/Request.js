/**
 * @class Request
 *
 * @description this class deals with every activity that has to do with requests.
 */
class Request {
  /**
          * @description -This method posts a request to the server/admin
          *
          * @param {object} event - This is the event object passed to the method.
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
          localStorage.removeItem('requestData');
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
      .catch((err) => {
        Render.renderLoader('loader', 'none', 'loader-text', '');
        Render.renderDiv('requestBox', 'block');
        const error = 'Internet Connection Error!';
        Render.renderAlert('alert-box', 'block', error, 'red');
        setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
        console.log(err);
      });
  }


  /**
          * @description -This method posts a request to the server fron the admin
          *
          * @param {object} event - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static updateRequest(event) {
    event.preventDefault();
    Render.renderDiv('updateForm', 'none');
    Render.renderLoader('loader', 'block', 'loader-text', 'Updating request...');
    const token = localStorage.getItem('token');
    const requestId = +event.target.attributes[1].value;
    fetch(`https://mt-tracker.herokuapp.com/api/v1/users/requests/${requestId}`, {
      method: 'PUT',
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
          Render.renderAlert('alert-box', 'block', 'Your request has been updated', 'green');
          Render.renderDiv('updateForm', 'none');
          setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
          localStorage.removeItem('requestData');
          window.location.pathname = 'userdashboard1.html';
        } else {
          const alertMessage =
                data.data.message === 'error occured while writing to a table' ?
                  'An error occurred while writing to server' : data.data.message;
          Render.renderDivColor('requestTitleText', '');
          Render.renderDivColor('requestType', '', '');
          Render.renderAlert('alert-box', 'block', alertMessage, 'red');
          Render.renderDiv('updateForm', 'block');

          if (alertMessage.includes('Title')) {
            Render.renderDivColor('requestTitleText', 'red');
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
      .catch((err) => {
        Render.renderLoader('loader', 'none', 'loader-text', '');
        Render.renderDiv('updateForm', 'block');
        const error = 'Internet Connection Error!';
        Render.renderAlert('alert-box', 'block', error, 'red');
        setTimeout(() => (Render.renderAlert('alert-box', 'none', '')), 5000);
        console.log(err);
      });
  }

  /**
          * @description -This method gets all request from the server
          *
          * @param {event} - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static getRequest() {
    Render.renderDiv('requestDisplay', 'none');
    Render.renderLoader('loader', 'block', 'loader-text', 'Fetching requests...');
    const token = localStorage.getItem('token');

    if (!localStorage.getItem('requestData')) {
      fetch('https://mt-tracker.herokuapp.com/api/v1/users/requests', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          authorization: `${token}`
        }
      })
        .then((response) => {
          if (response.status === 403 || response.status === 401) {
            window.localStorage.removeItem('requestData');
            window.location.pathname = '/login1.html';
          }
          return response.json();
        })
        .then((data) => {
          Render.renderLoader('loader', 'none', 'loader-text', '');
          if (data.status === 'fail' && data.data.message === 'No request found at this time') {
            const request = `<h2 style = "margin-top: 25%"> You currently have no request</h2> 
                            <div style = "margin-top: 5%">Click <a href ="createrequest1.html">here</a> to create a request 
                            </div>`;
            Render.renderDiv('requestDisplay', 'block');
            Render.renderAlert('adjustCard', 'block', request);
          } else {
            Render.renderDiv('requestDisplay', 'block');
            localStorage.setItem('requestData', JSON.stringify(data.data));
            const renderedData = data.data.map(x =>
              Render.renderRequestDivs('requestList', x.requesttitle, x.approved, x.id));
            let updateButtons = document.querySelectorAll('#getRequestButton');
            const addEvents = updateButtons.forEach(x => x.addEventListener('click', Request.getARequest));
            if (window.location.pathname === '/updaterequest1.html') {
              const editableRequestData = data.data.filter(x => x.approved === 'pending');
              Render.renderAlert('requestList', 'block', '');
              editableRequestData.forEach(x =>
                Render.renderRequestDivs('requestList', x.requesttitle, x.approved, x.id, 'Update'));
              updateButtons = document.querySelectorAll('#getRequestButton');
              const addEvents = updateButtons.forEach(x => x.addEventListener('click', Request.getARequest));
            }
          }
        })
        .catch((err) => {
          Render.renderDiv('requestDisplay', 'block');
          Render.renderLoader('loader', 'none', 'loader-text', '');
          const request = `<h2 style = "margin-top: 25%"> Please check your network Connection</h2> 
          <div style = "margin-top: 5%">Click <a href ="allrequest.html">here</a> to reload requests
          </div>`;
          Render.renderAlert('adjustCard', 'block', request);
          console.log(err);
        });
    } else {
      const requestData = JSON.parse(localStorage.getItem('requestData'));
      Render.renderDiv('requestDisplay', 'block');
      Render.renderLoader('loader', 'none', 'loader-text', '');
      requestData.forEach(x => Render.renderRequestDivs('requestList', x.requesttitle, x.approved, x.id));
      if (window.location.pathname === '/updaterequest1.html') {
        const editableRequestData = requestData.filter(x => x.approved === 'pending');
        Render.renderAlert('requestList', 'block', '');
        editableRequestData.forEach(x =>
          Render.renderRequestDivs('requestList', x.requesttitle, x.approved, x.id, 'Update'));
      }
    }
  }

  /**
          * @description -This method gets a particular request from the server
          *
          * @param {event} - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static getARequest(event) {
    event.preventDefault();
    const requestId = event.target.attributes[1].value;
    const requestData = JSON.parse(localStorage.getItem('requestData'));
    const particularRequest = requestData.filter(x => +x.id === +requestId);
    Render.renderAlert('requestDisplay', 'none', '');
    if (window.location.pathname === '/allrequest.html') {
      Render.renderDiv('requestDetailsDisplay', 'block');
      const name = localStorage.getItem('name');
      Render.renderRequestDetailsDiv(
        'requestDetailsDisplay',
        particularRequest[0].requesttitle,
        particularRequest[0].requesttype,
        particularRequest[0].message,
        particularRequest[0].approved,
        particularRequest[0].resolved,
        name
      );
    }
    Render.renderDiv('updateForm', 'block');
    Render.renderValue('requestTitleText', 'block', particularRequest[0].requesttitle);
    Render.renderValue('requestType', 'block', particularRequest[0].requesttype);
    Render.renderValue('message', 'block', particularRequest[0].message);
    updateButton.setAttribute('key', requestId);
    if (particularRequest[0].approved !== 'pending') updateButton.setAttribute('disabled', true);
    console.log(updateButton);
  }

  /**
          * @description -This method gets all request from the server
          *
          * @param {event} - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static getEditableRequest() {
    const requestData = JSON.parse(localStorage.getItem('requestData'));
    const editableRequestData = requestData.filter(x => x.approved === 'pending');
    Render.renderAlert('requestList', 'block', '');
    editableRequestData.forEach(x => Render.renderRequestDivs('requestList', x.requesttitle, x.approved, x.id, 'Update'));
    const updateButtons = document.querySelectorAll('#getRequestButton');
    const addEvents = updateButtons.forEach(x => x.addEventListener('click', Request.getARequest));
  }
  /**
          * @description -This method sorts request
          *
          * @param {object} event - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static sortRequest(event) {
    event.preventDefault();
    const requestData = JSON.parse(localStorage.getItem('requestData'));
    let requestStatus, requestName, resolved;
    if (event.target.id === 'getApprovedRequestButton') { requestStatus = 'success'; requestName = 'approved'; }
    if (event.target.id === 'getPendingRequestButton') { requestStatus = 'pending'; requestName = 'pending'; }
    if (event.target.id === 'getRejectedRequestButton') { requestStatus = 'fail'; requestName = 'rejected'; }
    if (event.target.id === 'getResolvedRequestButton') {
      requestStatus = 'success'; requestName = 'resolved';
      resolved = 'resolved';
    }
    const sortedRequest = requestData.filter(x => x[resolved || 'approved'] === requestStatus);

    const NoRequestFound = `<h2 style = "margin-top: 25%"> You currently have no ${requestName} requests</h2> 
          <div style = "margin-top: 5%">Click <a href ="allrequest.html">here</a> to reload requests
          </div>`;

    if (sortedRequest.length === 0) { Render.renderAlert('requestList', 'block', NoRequestFound); } else {
      Render.renderAlert('requestList', 'block', '');
      sortedRequest.forEach(x => Render.renderRequestDivs('requestList', x.requesttitle, x[resolved || 'approved'], x.id));
      const updateButtons = document.querySelectorAll('#getRequestButton');
      const addEvents = updateButtons.forEach(x => x.addEventListener('click', Request.getARequest));
    }
  }
  /**
          * @description -This method sorts request
          *
          * @param {object} event - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static searchEditableRequest(event) {
    event.preventDefault();
    const searchData = event.target.value.toLowerCase();
    const requestData = JSON.parse(localStorage.getItem('requestData'));
    const searchedEditableRequestData = requestData.filter(x =>
      (x.requesttitle.toLowerCase().startsWith(searchData) && x.approved.toLowerCase() === 'pending') ||
   (x.approved.toLowerCase() === 'pending' && 'pending'.startsWith(searchData)));
    const NoRequestFound = `<h2 style = "margin-top: 25%"> We currently cannot find the request you are looking for! 
   <p> Try refining your search </p></h2> 
         <div style = "margin-top: 5%">Click <a href ="allrequest.html">here</a> to reload requests
         </div>`;
    if (searchedEditableRequestData.length === 0) { Render.renderAlert('requestList', 'block', NoRequestFound); } else {
      Render.renderAlert('requestList', 'block', '');
      searchedEditableRequestData.forEach(x => Render.renderRequestDivs('requestList', x.requesttitle, x.approved, x.id, 'Update'));
      const updateButtons = document.querySelectorAll('#getRequestButton');
      const addEvents = updateButtons.forEach(x => x.addEventListener('click', Request.getARequest));
    }
  }
  /**
          * @description -This method searchs request
          *
          * @param {object} event - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static searchRequest(event) {
    event.preventDefault();
    const searchData = event.target.value.toLowerCase();
    const requestData = JSON.parse(localStorage.getItem('requestData'));

    const searchedData = requestData.filter(x => x.requesttitle.toLowerCase().startsWith(searchData)
     || (x.approved.toLowerCase() === 'pending' && 'pending'.startsWith(searchData)) ||
        (x.resolved.toLowerCase() === 'success' && 'resolved'.startsWith(searchData)) ||
        (x.approved.toLowerCase() === 'fail' &&
        ('rejected'.startsWidth(searchData) || 'disapproved'.startsWith(searchData))) ||
         (x.requesttype === 'repair' && 'repair'.startsWith(searchData)) ||
         (x.requesttype === 'maintenance' && 'maintenance'.startsWith(searchData)));

    const NoRequestFound = `<h2 style = "margin-top: 25%"> We currently cannot find the request you are looking for! 
    <p> Try refining your search </p></h2> 
          <div style = "margin-top: 5%">Click <a href ="allrequest.html">here</a> to reload requests
          </div>`;

    if (searchedData.length === 0) { Render.renderAlert('requestList', 'block', NoRequestFound); } else {
      Render.renderAlert('requestList', 'block', '');
      searchedData.forEach(x => Render.renderRequestDivs('requestList', x.requesttitle, x.approved, x.id));
      const updateButtons = document.querySelectorAll('#getRequestButton');
      const addEvents = updateButtons.forEach(x => x.addEventListener('click', Request.getARequest));
    }
  }


  /**
          * @description -This method refreshes request
          *
          * @param {object} event - This is the event object passed to the method.
          * @returns {null} -
          *
          * @memberOf Request class
          * @static
          */
  static refreshRequest(event) {
    event.preventDefault();
    localStorage.removeItem('requestData');
    Render.renderAlert('requestList', 'block', '');
    Request.getRequest();
  }
}
