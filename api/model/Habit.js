// module.exports = class Habit {
//     constructor(data){
//         this.id = data.id;
//         this.name = data.name;
//         this.date = data.date;
//         this.email = data.email;
//         this.likes1 = data.likes1;
//         this.likes2 = data.likes2;
//         this.likes3 = data.likes3;
//         this.gif = data.gif
//     };

//     static get All(){
//         const posts = Data.posts.map((post) => new Post(post));
//         return posts;
//     };

//     static findById(id){
//         try{
//             const postData = Data.posts.filter((post) => post.id === id)[0];
//             const post = new Post(postData);
//             return post;
//         } catch (err) {
//             throw new Error('This post does not exist.');
//         }
//     };
    
//     static create(post){
//         const newPostId = Data.posts.length;
//         const newPost = new Post({id: newPostId, title: '', body:'', date: new Date().toUTCString(), likes1: "0", likes2: "0", likes3: "0", gif: "", ...post});
//         Data.posts.push(newPost);
//         return newPost;
//     };
// };


const habitSchema = new mongoose.Schema({
    nodejs: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    React: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    SQL: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    Python: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});