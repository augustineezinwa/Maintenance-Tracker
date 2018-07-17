const signoutButton = document.getElementById('signoutButton');
const { signOut } = Authentication;

signoutButton.addEventListener('click', signOut);
