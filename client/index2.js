// navBar listeners
document.querySelector("#ref-login-section").addEventListener("click", showLoginSection);
document.querySelector("#ref-register-section").addEventListener("click", showRegisterSection);
document.querySelector("#ref-homepage").addEventListener("click", showHomepage);
document.querySelector("#ref-habits-section").addEventListener("click", showHabitsSection);
const habitsSection = document.querySelector('#habits-section');

// Login & Register listeners
document.querySelector('#login-form').addEventListener("submit", requestLogin);
document.querySelector('#register-form').addEventListener("submit", requestRegistration);

// -----------------FUNCTIONS----------------------

// function shows section 1 - allPosts, and hides the other sections
// Uses for switching between sections without submitting new post or comment data
function showLoginSection() {
    document.getElementById('homepage').classList.add('hide-section');
    document.getElementById('login-section').classList.remove('hide-section');
    document.getElementById('register-section').classList.add('hide-section');
    document.getElementById('habits-section').classList.add('hide-section');
  }

function showRegisterSection() {
    document.getElementById('homepage').classList.add('hide-section');
    document.getElementById('login-section').classList.add('hide-section');
    document.getElementById('register-section').classList.remove('hide-section');
    document.getElementById('habits-section').classList.add('hide-section');
  }

function showHomepage() {
    document.getElementById('homepage').classList.remove('hide-section');
    document.getElementById('login-section').classList.add('hide-section');
    document.getElementById('register-section').classList.add('hide-section');
    document.getElementById('regihabitsster-section').classList.add('hide-section');
  }

function showHabitsSection() {
    document.getElementById('homepage').classList.add('hide-section');
    document.getElementById('login-section').classList.add('hide-section');
    document.getElementById('register-section').classList.add('hide-section');
    document.getElementById('habits-section').classList.remove('hide-section');
    renderFeed();
  }

  

// LOGIN
  async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/api/user/login`, options)
        const data = await r.text()/*.json()*/
        console.log(data);
        if (data !== 'Logged in!') { throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
        // console.log('error');
    }
}

// REGISTER
async function requestRegistration(e) {
  e.preventDefault();
  try {
      const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
      }
      const r = await fetch(`http://localhost:3000/api/user/register`, options)
      const data = await r.text()/*json()*/
      if (data.err){ throw Error(data.err) }
      requestLogin(e);
  } catch (err) {
      console.warn(err);
  }
}

function login(data){
  localStorage.setItem('name', data.user);
  location.hash = '#habits-section';
}

function logout(){
  localStorage.clear();
  location.hash = '#login';
}

function currentUser(){
  const username = localStorage.getItem('username')
  return username;
}









// CONTENT
async function renderFeed() {
  const feed = document.createElement('section');
  feed.id = 'feed';

  const fields = [
      // { tag: 'label', attributes: { for: 'habit_input', name: 'habit'} },
      // { tag: 'input', attributes: { id: 'habit_input', type: 'text', name: 'habit', placeholder: 'Enter New Habit' } },
      // { tag: 'input', attributes: { type: 'submit', value: 'Submit' } }
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
  habitsSection.appendChild(form);

  
  const posts = await getAllHabits();
  const renderPost = postData => {
      const post = document.createElement('div');
      post.className = 'post';
      const frequency = document.createElement('p');
      const freqForm = document.createElement('form')
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
  habitsSection.appendChild(feed);
}












// REQUESTS
async function getAllHabits(){
  try {
      const response = await fetch('http://localhost:3000/habits');
      const data = await response.json();
      console.log(data);
      return data;
  } catch (err) {
      console.warn(err);
  }

}