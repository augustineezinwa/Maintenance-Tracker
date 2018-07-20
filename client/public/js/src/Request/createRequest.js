
const requestTitle = document.getElementById('requestTitle');
const message = document.getElementById('message');
const sendRequestButton = document.getElementById('sendRequestButton');
const requestType = document.getElementById('requestType');

const { createRequest } = Request;

sendRequestButton.addEventListener('click', createRequest);

