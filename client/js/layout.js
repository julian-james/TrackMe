const nav = document.querySelector('nav');
const main = document.querySelector('main');

const publicRoutes = [/*'#',*/ '#login', '#register'];
const privateRoutes = ['#feed', '#profile'];

window.addEventListener('hashchange', updateContent);

function updateNav(){
    nav.innerHTML = '';
    let links;
    let logoutBtn;
    if (currentUser()){
        links = privateRoutes.map(createNavLink);
        logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.onclick = logout;
        nav.appendChild(logoutBtn);
    } else {
        links = publicRoutes.map(createNavLink);
    }
    links.forEach(l => nav.insertBefore(l, logoutBtn))
}

function updateMain(path) {
    main.innerHTML = '';
    if (path) {
        switch(path){
            case '#login':
                renderLoginForm(); break;
            case '#register':
                renderRegisterForm(); break;
            case '#feed':
                renderFeed(); break;
            case '#profile':
                renderProfile(); break;
            default:
                render404(); break;
        }
    } else {
        renderHomepage();
    }
}

function createNavLink(route){
    const link = document.createElement('a');
    link.textContent = route === '#' ? 'Home' : `${route[1].toUpperCase()}${route.substring(2)}`;
    link.href = route;
    return link;

    // const logo = document.createElement('img');
    // logo.id = 'logo';
    // logo.src = 'https://res.cloudinary.com/getfutureproof/image/upload/v1595323029/futureproof_logotype_withBleed_huge_kl2rol.png';
    // logo.alt = 'futureproof logo'
    // main.appendChild(logo);
}

function updateContent(){
    const path = window.location.hash;
    if (privateRoutes.includes(path) && !currentUser()){
        window.location.hash = '#';
    } else {
        updateNav();
        updateMain(path);
    }
}

updateContent();