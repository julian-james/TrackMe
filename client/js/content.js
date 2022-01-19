const createHabitForm = document.querySelector('#create_habit_form');
const habitsList = document.querySelector('#feed');

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
    // const addHabit = document.createElement('form');
    // const createHabitLabel = document.createElement('label');
    // const habitInput = document.createElement('input');
    // const habitSubmit = document.createElement('input');

    // addHabit.setAttribute("id", "create_habit_form")
    // createHabitLabel.setAttribute("for", "habit_input");
    // createHabitLabel.textContent = "Create a Habit";
    // habitInput.setAttribute("id", "habit_input");
    // habitInput.setAttribute("type", "text");
    // habitSubmit.setAttribute("type", "submit");
    // habitSubmit.setAttribute("value", "submit");

    // addHabit.appendChild(createHabitLabel);
    // addHabit.appendChild(habitInput);
    // addHabit.appendChild(habitSubmit);
    // main.appendChild(addHabit);

    const fields = [
        { tag: 'label', attributes: { for: 'habit_input', name: 'habit'} },
        { tag: 'input', attributes: { id: 'habit_input', type: 'text', name: 'habit', placeholder: 'Enter New Habit' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Submit' } }
    ]
    const form = document.createElement('form');
    form.id = 'create_habit_form';
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            form.appendChild(field);
        })
    })
    main.appendChild(form);

    
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

        post.appendChild(habitName);
        post.appendChild(frequency);
        post.appendChild(goal);
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

// async function createNewHabit(e) {
//     e.preventDefault();
//     try {
//         const options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
//         }
//         const r = await fetch(`http://localhost:3000/habits`, options)
//         const data = await r.text()/*json()*/
//         console.log(data)
//         // if (data.err){ throw Error(data.err) }
//         // requestLogin(e);

//     } catch (err) {
//         console.warn(err);
//     }
// }









async function createNewHabit(e){
    e.preventDefault();

        const habitData = {
            HabitName: e.target.habit_input.value,
            Frequency: 0,
            Goal: false,
            Progress: 0,
            Streak: 0
        };
    
        const options = { 
            method: 'POST',
            body: JSON.stringify(habitData),
            headers: { "Content-Type": "application/json" }
        };
    
        await fetch('http://localhost:3000/habits', options)
            .then(r => r.json())
            .then(appendHabit)
            .then(() => e.target.reset())
            .catch(console.warn)
};

function appendHabit(habitData){
    const div = document.createElement('div');
    div.className = 'post';
    const habitLi = formatHabitDiv(habitData, div)
    habitsList.append(div);
};

function formatHabitDiv(habit, div){
    const frequency = document.createElement('p');
    const goal = document.createElement('p');
    const habitName = document.createElement('p');
    const progress = document.createElement('p');
    const streak = document.createElement('p');

    // const delBtn = document.createElement('button');
    // const uptBtn = document.createElement('button');
    // delBtn.setAttribute('class', 'delete')
    // uptBtn.setAttribute('class', 'update')
    // delBtn.textContent = 'X';
    // uptBtn.textContent = '+';
    // delBtn.onclick = () => deleteDog(habit.id, div);
    // uptBtn.onclick = () => updateDog(habit.id, div);
    // delTd.append(delBtn);
    // uptTd.append(uptBtn);

    frequency.textContent = `Frequency: ${habit.Frequency}`;
    goal.textContent = `Goal: ${habit.Goal}`;
    habitName.textContent = `Habit: ${habit.HabitName}`;
    progress.textContent = `Progress: ${habit.Progress}`;
    streak.textContent = `Streak: ${habit.Streak}`;

    div.append(frequency)
    div.append(goal)
    div.append(habitName)
    div.append(progress)
    div.append(streak)

    return div
}




// async function createNewHabit2(e) {
//     e.preventDefault();
//     try {
//         const options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
//         }
//         const r = await fetch(`http://localhost:3000/habits`, options)
//         const data = await r.text()/*json()*/
//         if (data.err){ throw Error(data.err) }
//         // requestLogin(e);
//     } catch (err) {
//         console.warn(err);
//     }
// }




createHabitForm.addEventListener('submit', createNewHabit);