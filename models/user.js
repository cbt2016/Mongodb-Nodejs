var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (value)=> validator.isEmail(value),
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    tokens:[{
        access: {
            type:String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function(){
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj,['_id','email']);
    
};

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    console.log(JSON.stringify(user,undefined,2));
    var token = jwt.sign({_id:user._id.toHexString(),access},'123abc').toString();
    user.tokens.push({access,token});
    
    return user.save().then((user)=>{  //return it so as to chain on it and get token on the server as a promise
        return token;
    });
};

var User = mongoose.model('User',userSchema);

module.exports = {User};