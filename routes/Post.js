const Router = require('express').Router();

let Post = require('../models/postModel');
const requiredLogin = require("../middleware/requireLogin");

Router.route('/createPost').post(requiredLogin, (req, res) => {
    const {title, description, photo} = req.body;
    if (!title || !description || !photo) {
        return res.status(400).json({error: "required fields are missing"})
    }
    
    const post = new Post({
        title,
        description,
        photo,
        postedBy: req.user
    });
    post.save()
        .then(result => res.json({post: result}))
        .catch((err) => console.log(err))
})

Router.route("/allposts").get(requiredLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comment.postedBy","_id name")
        .then(response => res.json({posts: response}))
        .catch(error => console.log(error))
})

Router.route("/myPosts").get(requiredLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
        .populate("postedBy", "id name photo")
        .then(data => res.json({posts: data}))
        .catch(err => console.log(err))
})

Router.route("/like").put(requiredLogin, (req, res) => {
    console.log(req.user)
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(400).json({error: err})
        } else {
            return res.json(result)
        }
    })
})

Router.route("/unlike").put(requiredLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(400).json({error: err})
        } else {
            return res.json(result)
        }
    })
})

Router.route("/comment").put(requiredLogin,((req,res)=>{
    const comment={
        text:req.body.comment,
        postedBy:req.user
    }
    Post.findByIdAndUpdate(req.body.postId,{
    $push:{comment:comment}
    },{
        new:true
    }).populate("comment.postedBy", "_id name")
        .exec((err,result)=>{
            if(err){
                return res.status(400).json({error:err})
            }
            else {
                return res.json({result})
            }
        })
}))

Router.route("/:postId/:commentId").delete(requiredLogin,((req,res)=>{
    const comment={
        _id:req.params.commentId
    }
    Post.findByIdAndUpdate(req.params.postId,{
        $pull:{comment:comment}
    },{
        new:true
    }).populate("comment.postedBy", "_id name")
        .exec((err,result)=>{
            if(err){
                return res.status(400).json({error:err})
            }
            else {
                return res.json({result})
            }
        })
}))

Router.route("/deletePost/:postId").delete(requiredLogin,((req,res)=>{
    Post.findOne({_id:req.param.postId})
        .populate("postedBy", "_id")
        .exec((err,post)=>{
            if(err || !post){
                return res.status(422).json({error:err})
            }
            if(post.postedBy._id.toString() === req.user._id.toString()){
                post.remove()
                    .then(res=>res.json({message:res}))
                    .catch(err=>console.log(err))
            }
        })
}))

module.exports = Router;
