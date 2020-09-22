const express = require("express");
const mongoose=require('mongoose');
const router = express.Router();
const Auth = mongoose.model("Auth");
const Post=mongoose.model("Post");
const requiredLogin = require("../middleware/requireLogin");


router.route("/:id").get(requiredLogin,(req, res) => {
    Auth.findOne({_id:req.params.id})
        .select("-password")
        .then(user=>{
            Post.find({postedBy: req.params.id})
                .populate("postedBy","_id name")
                .exec((err,posts)=>{
                    if(err){
                        return res.status(422).json({error:err})
                    }
                    else{
                        return res.json({user,posts})
                    }
                })
        }).catch(err=>res.status(422).json(err))
})

router.route("/follow").put(requiredLogin,(req,res)=>{
    Auth.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{new:true}),(err,result)=>{
        if(err){
            return res.status(422).json({err})
        }
        Auth.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).then(result=>res.json({result}))
            .catch(err=>res.status(422).json({err}))
    }
})

router.route("/unfollow").put(requiredLogin,(req,res)=>{
    Auth.findByIdAndUpdate(req.body.unfollowId,{
        pull:{followers:req.user._id}
    },{new:true}),(err,result)=>{
        if(err){
            return res.status(422).json({err})
        }
        Auth.findByIdAndUpdate(req.user._id,{
            pull:{following:req.body.unfollowId}
        },{
            new:true
        }).then(result=>res.json({result}))
            .catch(err=>res.status(422).json({err}))
    }
})
module.exports = router;