const mongoose = require('mongoose');

module.exports = class User {
    constructor(data) {
        this.user_id = data.user_id,
        this.username = data.username,
        this.email = data.email,
        this.password = data.password
    }

    static get All(){
        const users = Data.users.map((user) => new Post(user));
        return posts;
    };

    static findById(id){
        try{
            const postData = Data.posts.filter((post) => post.id === id)[0];
            const post = new Post(postData);
            return post;
        } catch (err) {
            throw new Error('This post does not exist.');
        }
    };
    
    static create(post){
        const newPostId = Data.posts.length;
        const newPost = new Post({id: newPostId, title: '', body:'', date: new Date().toUTCString(), likes1: "0", likes2: "0", likes3: "0", gif: "", ...post});
        Data.posts.push(newPost);
        return newPost;
    };
};



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
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

module.exports = mongoose.model('User', userSchema)