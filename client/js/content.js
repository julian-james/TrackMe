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
    const habits = await getAllHabits();

    // add button section
    const BtnDiv = document.createElement("div")
    const addHabitBtn = document.createElement("button")
    BtnDiv.appendChild(addHabitBtn)
    main.appendChild(BtnDiv)
    addHabitBtn.textContent= "Add Habit"

    // habit section
    const renderHabit = habitData => {

        const HabitDiv = document.createElement("div")
        const name = document.createElement("h2")
        const HabitStreak = document.createElement("h2")
        const ProgressBtn = document.createElement("button")

        name.textContent = habitData.HabitName
        HabitStreak.textContent = habitData.Streak
        
        HabitDiv.appendChild(name)
        HabitDiv.appendChild(HabitStreak)
        HabitDiv.appendChild(ProgressBtn)
        feed.appendChild(HabitDiv)
    }
    habits.forEach(renderHabit);
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
