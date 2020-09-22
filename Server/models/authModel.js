const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;
const AuthSchema = new Schema({
    name:{
      required:true,
      type:String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    photo:{
        default:"https://res.cloudinary.com/ajaui/image/upload/v1600338669/insta_hgal1s.png",
        type:String
    },
    followers:[
        {
            type:ObjectId,
            ref:"Auth"
        }
    ],
    following:[
        {
            type:ObjectId,
            ref:"Auth"
        }
    ]
}, {
    timestamps: true
})

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;