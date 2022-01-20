// to add Trackme logo
function renderHomepage(){
    const logo = document.createElement('mp4');
    logo.id = 'logo';
    logo.src = '';
    logo.alt = 'TRACKme app logo'
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

// add progress button function
async function addProgress(e) {
    
    const options = {
        method: "PATCH"

    }
    await fetch(`http://localhost:3000/habits/${e.target.id}/progress`, options)

}

// add habit render form
async function renderHabitForm() {

}

// add new habit
async function addNewHabit(e) {
    const name = e.target.form[0].value
    const freq = e.target.form[1].value 

        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                HabitName: name,
                Frequency: freq
            })
        }
        await fetch("http://localhost:3000/habits", options)
    // find better way of reloading
    location.reload()
}

// delete habit
async function deleteHabit(e) {
    const options = {
        method: "DELETE"
    }
    await fetch(`http://localhost:3000/habits/${e.target.id}`, options)
}

async function renderFeed() {
    const feed = document.createElement('section');
    feed.id = 'feed';
    const habits = await getAllHabits();

    // add habit section
    const addHabitDiv = document.createElement("div")
    const addHabitForm = document.createElement("form")
    const habitNameInput = document.createElement("input")
    const frequencyInput = document.createElement("input")
    const submitBtn = document.createElement("button")
    
    submitBtn.addEventListener("click", addNewHabit)

    addHabitDiv.classList.add("addHabitDiv")
    main.appendChild(addHabitDiv)
    addHabitDiv.appendChild(addHabitForm)
    addHabitForm.appendChild(habitNameInput)
    addHabitForm.appendChild(frequencyInput)
    addHabitForm.appendChild(submitBtn)

    // add button section
    const BtnDiv = document.createElement("div")
    const addHabitBtn = document.createElement("button")
    BtnDiv.appendChild(addHabitBtn)
    main.appendChild(BtnDiv)
    addHabitBtn.textContent= "Add Habit"
    submitBtn.textContent= "Submit new habit"

    // habit section
    const renderHabit = habitData => {

        const id = habitData._id
        const HabitDiv = document.createElement("div")
        const name = document.createElement("h2")
        const HabitStreak = document.createElement("h2")
        const ProgressBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const progressNumber = document.createElement("p")
        const habitGoal = document.createElement("h3")

        // circuluar progress bar
        // STYLED progressBarDiv
        // STYLED outer
        // STYLED inner
        const progressBarDiv = document.createElement("div")
        const outer = document.createElement("div")
        const inner = document.createElement("div")
        progressBarDiv.classList.add('progressBarDiv')
        outer.classList.add("outer")
      
        let frequency = habitData.Frequency
        let progress = habitData.Progress  
        
        console.log(`(${(progress/frequency)*360})`)
        outer.style.background =  `conic-gradient(#4d5bf9 ${(progress/frequency)*360}deg, #cadcff ${(progress/frequency)*360}deg)` 
        

        ProgressBtn.setAttribute("id", id)
        deleteBtn.setAttribute("id", id)
        inner.setAttribute("id", "inner")
      
        name.textContent = habitData.HabitName
        HabitStreak.textContent = habitData.Streak
        ProgressBtn.textContent = "+"
        deleteBtn.textContent = "x"
        progressNumber.textContent = habitData.Progress
      
        // habit tracking goal 
        if(habitData.Frequency - habitData.Progress > 0) {
            habitGoal.textContent = `You have to do ${habitData.Frequency - habitData.Progress} more!`
        } else if(habitData.Frequency - habitData.Progress == 0) {
            habitGoal.textContent = "You have completed your task for the day!"
            inner.textContent = `${progress/frequency * 100}%`
        } else {
            habitGoal.textContent = `You have done ${habitData.Progress - habitData.Frequency} more than your goal for the day! Good Job :)`
            inner.textContent = `100%`
        }
            
        HabitDiv.appendChild(name)
        HabitDiv.appendChild(habitGoal)
        HabitDiv.appendChild(HabitStreak)
        HabitDiv.appendChild(ProgressBtn)
        HabitDiv.appendChild(deleteBtn)
        HabitDiv.appendChild(progressBarDiv)
        progressBarDiv.appendChild(outer)
        outer.appendChild(inner)
        ProgressBtn.appendChild(progressNumber)
        feed.appendChild(HabitDiv)

        ProgressBtn.addEventListener("click", addProgress)
        addHabitBtn.addEventListener("click", renderHabitForm)
        deleteBtn.addEventListener("click", deleteHabit)

        console.log(id)
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
