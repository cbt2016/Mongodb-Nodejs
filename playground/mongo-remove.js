var {ObjectID} = require('mongodb');
var {mongoose} = require('../db/mongoose');
var {Todo} = require('../models/todo');

/*Todo.remove({}).then((res)=>{
    console.log(res);
});*/

var id = '58dbda7a2aaa9539a7deadb0' ;

/*Todo.findByIdAndRemove({_id: id}).then((res)=>{
    console.log(res);
},(err)=>{
    console.log(err.message);
});*/

Todo.findOneAndRemove({_id:id}).then((res)=>{
    console.log(res);
},(err)=>{
    console.log(err.message);
});