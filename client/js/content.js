function renderHomepage(){
    const logo = document.createElement('img');
    logo.id = 'logo';
    logo.src = 'https://res.cloudinary.com/getfutureproof/image/upload/v1595323029/futureproof_logotype_withBleed_huge_kl2rol.png';
    logo.alt = 'futureproof logo'
    main.appendChild(logo);
}


function renderLoginForm() {
    const fields = [
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Login' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            form.appendChild(field);
        })
    })
    form.addEventListener('submit', requestLogin)
    main.appendChild(form);
}

function renderRegisterForm() {
    const fields = [
        { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'password', name: 'passwordConfirmation', placeholder: 'Confirm Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Create Account' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            form.appendChild(field);
        })
    })
    form.addEventListener('submit', requestRegistration)
    main.appendChild(form);
}

async function renderFeed() {
    const feed = document.createElement('section');
    feed.id = 'feed';
    const posts = await getAllHabits();
    const renderPost = postData => {
        const post = document.createElement('div');
        post.className = 'post';
        const frequency = document.createElement('p');
        const goal = document.createElement('p');
        const habitName = document.createElement('p');
        const progress = document.createElement('p');
        const streak = document.createElement('p');
        frequency.textContent = `Frequency: ${postData.Frequency}`;
        goal.textContent = `Goal: ${postData.Goal}`;
        habitName.textContent = `Habit: ${postData.HabitName}`;
        progress.textContent = `Progress: ${postData.Progress}`;
        streak.textContent = `Streak: ${postData.Streak}`;
        post.appendChild(frequency);
        post.appendChild(goal);
        post.appendChild(habitName);
        post.appendChild(progress);
        post.appendChild(streak);
        feed.appendChild(post);
    }
    posts.forEach(renderPost);
    main.appendChild(feed);
}

function renderProfile() {
    const profile = document.createElement('section');
    const greeting = document.createElement('h3');
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`
    profile.appendChild(greeting);
    main.appendChild(profile);
}

function render404() {
    const error = document.createElement('h2');
    error.textContent = "Oops, we can't find that page sorry!";
    main.appendChild(error);
}
