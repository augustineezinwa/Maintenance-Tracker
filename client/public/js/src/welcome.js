const message = localStorage.getItem('name');
Render.renderAlert('welcome-message', 'block', `Welcome ${message}`);
