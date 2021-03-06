const createHabitForm = document.querySelector('#create_habit_form');
const habitsList = document.querySelector('#feed');

function renderHomepage(){
    const logo = document.createElement('img');
    logo.id = 'logo';
    // logo.src = 'https://user-images.githubusercontent.com/79319621/150428551-2fa8e0f6-f00e-4f75-93c1-d782a39a1a57.png';
    logo.src = 'https://user-images.githubusercontent.com/79319621/150434280-1ecb8603-b4fd-4da4-baba-99cfcd543ff0.png';
    logo.alt = 'futureproof logo'
    main.appendChild(logo);
    logo.classList.add('logo')
}



function renderLoginForm() {
    const fields = [
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email', class:'form-control' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password',  class:'form-control'  } },
        { tag: 'input', attributes: { type: 'submit', value: 'Login', class:'btn btn-primary' } }
    ]
    const logo = document.createElement('img');
    logo.src = 'https://user-images.githubusercontent.com/79319621/150429519-ba3ef24d-8a95-4e00-9de1-e87628ad7ac7.png';
    logo.alt = 'futureproof logo'
    logo.classList.add("logo2")
    main.appendChild(logo);
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
        { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username', class:'form-control'  } },
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email', class:'form-control'  } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password', class:'form-control'  } },
        { tag: 'input', attributes: { type: 'password', name: 'passwordConfirmation', placeholder: 'Confirm Password', class:'form-control'  } },
        { tag: 'input', attributes: { type: 'submit', value: 'Create Account', class:'btn btn-primary' } }
    ]
    const logo = document.createElement('img');
    logo.src = 'https://user-images.githubusercontent.com/79319621/150429519-ba3ef24d-8a95-4e00-9de1-e87628ad7ac7.png';
    logo.alt = 'futureproof logo'
    logo.classList.add("logo2")
    main.appendChild(logo);
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
    location.reload()
}

// add habit render form
async function renderHabitForm() {

}

// add new habit
async function addNewHabit(e) {
    const name = e.target.form[0].value
    const freq = e.target.form[1].value 

    if(name ==""){
        return validateForm()
    }

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
    location.reload()
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
    const deleteAddHbtBtn = document.createElement("button")
    frequencyInput.setAttribute("type", "number")
    frequencyInput.setAttribute("value", "1")
    habitNameInput.classList.add("habitNameInput")
    habitNameInput.setAttribute("placeholder", "Enter name of habit")

    submitBtn.addEventListener("click", addNewHabit)

    addHabitDiv.classList.add("addHabitDiv")
    habitNameInput.classList.add("form-control")
    frequencyInput.classList.add("form-control")
    submitBtn.classList.add("btn")

    habitNameInput.setAttribute("placeholder", "Name your habit...")
    frequencyInput.setAttribute("placeholder", "Set your frequency...")

    deleteAddHbtBtn.textContent = "x"
    main.appendChild(addHabitDiv) 
    addHabitDiv.appendChild(addHabitForm)
    addHabitDiv.appendChild(deleteAddHbtBtn)

    deleteAddHbtBtn.classList.add("deleteAddHbtBtn")
    deleteAddHbtBtn.addEventListener("click", showAddHabitForm)
    
    addHabitForm.appendChild(habitNameInput)
    addHabitForm.appendChild(frequencyInput)
    addHabitForm.appendChild(submitBtn)

    // add button section
    const BtnDiv = document.createElement("div")
    const addHabitBtn = document.createElement("button")
    BtnDiv.appendChild(addHabitBtn)
    main.appendChild(BtnDiv)
    main.appendChild(addHabitDiv)
    addHabitBtn.textContent= "Add Habit"
    submitBtn.textContent= "Submit new habit"
    addHabitBtn.classList.add("addHabitBtn")
 

    addHabitBtn.addEventListener("click", showAddHabitForm)
    addHabitBtn.classList.add('button-53')

    // habit section
    const renderHabit = habitData => {

        const id = habitData._id
        const HabitDiv = document.createElement("div")
        const HabitLeftUpperDiv = document.createElement("div")
        const HabitLeftLowerDiv = document.createElement("div")
        const HabitLeftDiv = document.createElement("div")
        const HabitRightDiv = document.createElement("div")
        const name = document.createElement("h1")
        const HabitStreak = document.createElement("h2")
        const ProgressBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const habitGoal = document.createElement("h3")

        // classes
        HabitLeftDiv.classList.add("HabitLeftDiv")
        HabitRightDiv.classList.add("HabitRightDiv")
        HabitLeftUpperDiv.classList.add("HabitLeftUpperDiv")
        HabitLeftLowerDiv.classList.add("HabitLeftLowerDiv")
        ProgressBtn.classList.add("ProgressBtn")
        deleteBtn.classList.add("deleteBtn")
        ProgressBtn.classList.add("ProgressBtn")
        // circuluar progress bar
        const progressBarDiv = document.createElement("div")
        const outer = document.createElement("div")
        const inner = document.createElement("div")
        progressBarDiv.classList.add('progressBarDiv')
        outer.classList.add("outer")
        outer.setAttribute("id", "progress-outer")
      
        let frequency = habitData.Frequency
        let progress = habitData.Progress  
        
        // console.log(`(${(progress/frequency)*360})`)
        outer.style.background =  `conic-gradient(#4d5bf9 ${(progress/frequency)*360}deg, #cadcff ${(progress/frequency)*360}deg)` 
        if(progress/frequency >= 1) {
            outer.style.background = "rgb(75, 214, 41)";
        }

        HabitDiv.classList.add("habit-div")
        ProgressBtn.setAttribute("id", id)
        deleteBtn.setAttribute("id", id)
        inner.setAttribute("id", "inner")

        if(habitData.Streak == 0) {
            HabitStreak.textContent = "Complete your habit to start a streak!"
        } else {
            HabitStreak.textContent = habitData.Streak + " ????"
        }
      
        name.textContent = habitData.HabitName
        ProgressBtn.textContent = "+"
        deleteBtn.textContent = "x"

        
      
        // habit tracking goal 
        if(habitData.Frequency - habitData.Progress > 0) {
            habitGoal.textContent = `You have to do ${habitData.Frequency - habitData.Progress} more!`
            inner.textContent = `${Math.round(progress/frequency * 100)}%`
        } else if(habitData.Frequency - habitData.Progress == 0) {
            habitGoal.textContent = "You have completed your task for the day!"
            inner.textContent = `100%`
        } else {
            habitGoal.textContent = `You have done ${habitData.Progress - habitData.Frequency} more than your goal for the day! Good Job :)`
            inner.textContent = `100%`
        }
            
        HabitDiv.appendChild(HabitLeftDiv)
        HabitDiv.appendChild(HabitRightDiv)
        HabitLeftDiv.appendChild(HabitLeftUpperDiv)
        HabitLeftDiv.appendChild(HabitLeftLowerDiv)
        HabitLeftUpperDiv.appendChild(name)
        HabitLeftUpperDiv.appendChild(HabitStreak)
        HabitLeftLowerDiv.appendChild(habitGoal)
        HabitRightDiv.appendChild(deleteBtn)
        HabitRightDiv.appendChild(progressBarDiv)
        progressBarDiv.appendChild(outer)
        outer.appendChild(ProgressBtn)
        outer.appendChild(inner)
        feed.appendChild(HabitDiv)

        ProgressBtn.addEventListener("click", addProgress)
        addHabitBtn.addEventListener("click", renderHabitForm)
        deleteBtn.addEventListener("click", deleteHabit)

        console.log(id)
    }

    habits.forEach(renderHabit);
    main.appendChild(feed);
    
}

async function validateForm() {
    alert("Input a name for the habit")
}

async function showAddHabitForm() {
    const div = document.querySelector(".addHabitDiv")
    div.classList.toggle("moveHabitDiv")
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




// createHabitForm.addEventListener('submit', createNewHabit);