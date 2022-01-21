async function getAllHabits(){
    try {
        const response = await fetch('https://track-me-full-stack.herokuapp.com/habits');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.warn(err);
    }

}