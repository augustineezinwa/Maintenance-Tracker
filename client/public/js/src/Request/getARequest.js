
const updateButton = document.getElementById('updateButton');
const requestTitle = document.getElementById('requestTitleText');
const message = document.getElementById('message');
const requestType = document.getElementById('requestType');
const { updateRequest, getARequest } = Request;
const updateButtons = document.querySelectorAll('#getRequestButton');
const addEvents = updateButtons.forEach(x => x.addEventListener('click', getARequest));
updateButton.addEventListener('click', updateRequest);

