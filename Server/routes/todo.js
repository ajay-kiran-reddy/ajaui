const router = require('express').Router();

let Todo = require("../models/todoModel");

router.route('/').get((req, res) => {
    Todo.find()
        .then(item => res.json(item))
        .catch(err => res.status(400).json("Error" + err))
})

router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const taskName =req.body.taskName;
    const status=req.body.status;
    // const endDate=Date.parse(req.body.endDate);
    const newUser = new Todo({userName,taskName,status});
    newUser.save()
        .then(() => res.json("User added successfully"))
        .catch(err => res.status(400).json("Error" + err))
})

router.route('/edit/:id').post((req,res)=>{
    Todo.findById(req.params.id)
        .then((user)=>{
            user.userName=req.body.userName;
            user.taskName=req.body.taskName;
            user.status=req.body.status;
            user.endDate=Date.parse(req.body.endDate)

            const newUser= new Todo(user);

            newUser.save()
                .then(()=>res.json('User Date is Updated...!!!'))
                .catch(err=>res.json('Error'+ err))
        }).catch(err=>res.json('Error' + err))

})

router.route('/delete/:id').delete((req,res)=>{
    Todo.findByIdAndDelete(req.params.id)
        .then(()=>res.json("User is Deleted"))
        .catch((err)=>res.json("Error"+err))
})


module.exports = router;