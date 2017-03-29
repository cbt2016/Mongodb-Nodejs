var {ObjectID} = require('mongodb');
var {mongoose} = require('../db/mongoose');
var {User} = require('../models/user');

var id = "58db87a113e2e715b8fbad68";
if(!ObjectID.isValid(id)){
    console.log('ID not Valid');
}else{
     
    User.find({
        _id: id
    }).then((todos) => {
        console.log(todos);
    }, (err) => {
        console.log(err);
    });
    
    User.findOne({_id:id}).then((todo)=>{
        console.log(todo);
    },(err)=>{
        console.log(err.message);
    });
    
    User.findById(id).then((todo)=>{
        console.log('find by id: ',todo);
    },(err)=>{
        console.log(err.message);
    });
}
