const searchText = document.getElementById('searchText');
const refreshButton = document.getElementById('refreshButton');
const { searchEditableRequest, refreshRequest } = Request;
searchText.addEventListener('keyup', searchEditableRequest);
refreshButton.addEventListener('click', refreshRequest);
