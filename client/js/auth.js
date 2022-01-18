// ********************************************
// SETUP
// const form = document.querySelector('#login-form');

// Bind even÷t listeners
// form.addEventListener('submit', requestLogin);


// // Login
// function submitLogin(e){
//     e.preventDefault();

//     const loginData = {
//         title: e.target.email.value,
//         pseudonym: e.target.password.value,
//     };

//     const options = { 
//         method: 'POST',
//         body: JSON.stringify(loginData),
//         headers: { "Content-Type": "application/json" }
//     };

//     fetch('http://localhost:3000/login', options)
//         .then(r => r.json())
//         .then(() => e.target.reset())
//         .catch(console.warn)
// };

async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/api/user/login`, options)
        const data = await r.json()
        if (data.err) { throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/api/user/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(data){
    localStorage.setItem('username', data.user);
    location.hash = '#feed';
}

function logout(){
    localStorage.clear();
    location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}