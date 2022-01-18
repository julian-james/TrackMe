// ********************************************
// SETUP
const form = document.querySelector('#login-form');

// Bind event listeners
form.addEventListener('submit', submitLogin);


// Login
function submitLogin(e){
    e.preventDefault();

    const loginData = {
        title: e.target.email.value,
        pseudonym: e.target.password.value,
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/login', options)
        .then(r => r.json())
        .then(() => e.target.reset())
        .catch(console.warn)
};