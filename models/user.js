var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

userSchema.statics.findByToken = function(token){
    var User = this;
    var decoded ;
    try{
        decoded = jwt.verify(token,'123abc');
    }catch(e){
        /*return new Promise((resolve,reject)=>{
            reject();
        });*/
        return Promise.reject();
    }
    
    return User.find({
        '_id': decoded._id,
        'tokens.access': 'auth',
        'tokens.token' : token
    });
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

//call mongoose middleware before each save of the user
userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hashed)=>{
                user.password = hashed;
                next();
            });
        });
    }else{
        next();
    }
});

var User = mongoose.model('User',userSchema);

module.exports = {User};