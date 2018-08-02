const { getARequest } = Request;
const requestData = JSON.parse(localStorage.getItem('requestData'));
if (!requestData) Request.getRequest();
const updateButtons = document.querySelectorAll('#getRequestButton');
const addEvents = updateButtons.forEach(x => x.addEventListener('click', getARequest));
