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