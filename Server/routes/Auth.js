const router = require('express').Router();
let Auth = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');

router.route('/signup').post((req, res) => {
    const {name, email, password, photo} = req.body;
    if (!email || !name || !password) {
        res.status(422).json({error: 'Please add all the required fields'})
    } else {
        Auth.findOne({email: email})
            .then((savedUser => {
                if (savedUser) {
                    return res.status(422).json({error: 'User already existed with that email'})
                }
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const user = new Auth({
                            email,
                            name,
                            password: hashedPassword,
                            photo
                        });
                        user.save()
                            .then(() => res.json({message: 'User Saved Successfully'}))
                            .catch(err => res.status(400).json({error: err}))
                    })
            }))
            .catch(err => res.status(400).json({error: err}))
    }
})

router.route('/signin').post((req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(422).json({error: "Please provide email and password"})
    }
    
    Auth.findOne({email: email})
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({error: 'Invalid Username or Password'})
            } else {
                bcrypt.compare(password, savedUser.password)
                    .then(isMatched => {
                        if (isMatched) {
                            const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                            const userDetails = {
                                accessToken: token,
                                user: savedUser
                            }
                            res.json({userDetails})
                        } else {
                            return res.status(422).json({error: 'Invalid username or password'})
                        }
                    })
            }
        })
        .catch(err => console.log(err))
})

router.route('/editProfile/:userid').post((req, res) => {
    const {email, name, photo, password} = req.body;
    // const hashPassword=bcrypt.hash(password, 12)
    // Auth.findByIdAndUpdate({_id: req.params.userid}, {
    //     $push: {
    //         email,
    //         name,
    //         password:hashPassword,
    //         photo
    //     }
    // }, {new: true}).exec((err, result) => {
    //     if (err) {
    //         return res.status(422).json({error: err})
    //     } else {
    //         return res.json({message: result})
    //     }
    // })
    
    Auth.findOne({email: email})
        .then((savedUser => {
            console.log(savedUser,'saved user')
            if (savedUser) {
                return res.status(422).json({error: 'User already existed with that email'})
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new Auth({
                        email,
                        name,
                        password: hashedPassword,
                        photo
                    });
                    user.save()
                        .then(() => res.json({message: 'User Saved Successfully'}))
                        .catch(err => res.status(400).json({error: err}))
                })
        }))
        .catch(err => res.status(400).json({error: err}))
})

module.exports = router;