// Select the main container and the register/login buttons.
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');


// Show the registration form by activating the container.
registerBtn.addEventListener('click', () => {
    container.classList.add('active');

});

// Show the login form by removing the active state.
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');

});