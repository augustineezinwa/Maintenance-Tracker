
const updateButton = document.getElementById('updateButton');
const requestTitle = document.getElementById('requestTitleText');
const message = document.getElementById('message');
const requestType = document.getElementById('requestType');
const { updateRequest } = Request;
updateButton.addEventListener('click', updateRequest);

