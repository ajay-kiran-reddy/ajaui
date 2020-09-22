const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectID} = mongoose.Schema.Types;

const PostSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    photo: {
        required: true,
        type: String
    },
    likes: [{
        type: ObjectID,
        ref: "Auth"
    }],
    comment: [{
        text: String,
        postedBy: {
            type: ObjectID,
            ref: "Auth"
        }
    }],
    postedBy: {
        type: ObjectID,
        ref: "Auth"
    }
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;