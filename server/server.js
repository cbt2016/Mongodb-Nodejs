const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
require('../config/config');
const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {authenticate} = require('../middleware/authenticate');

const port = process.env.PORT;
console.log('MONGODB_URI **' ,process.env.MONGODB_URI);
var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var newTodo = new Todo({text: req.body.text,completed:req.body.completed});
    newTodo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err.message);
    });
});

app.get('/todos',(req,res)=>{
   Todo.find({}).then((todos)=>{
       res.send({todos});
   },(err)=>{
       res.status(400).send(e);
   }); 
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(400).send('ID NOT VALID');
    }else{
        Todo.findById(id).then((todo)=>{
            if(!todo){
                return res.status(404).send('todo not found');
            }
            res.send({todo});
        },(err)=>{
            res.status(404).send(err.message);
        });
    }
    
});

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }else{
        Todo.findOneAndRemove({_id:id}).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send(todo);
        });
    }
});

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Bad Request');
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findByIdAndUpdate(id,{$set:body},{new: true}).then((todo)=>{
        if(!todo){
            return res.status(400).send('Nothing to Update');
        }
        
        res.status(200).send({todo});
    });
       
});

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var newUser = new User(body);
    newUser.save().then(()=>{
        return newUser.generateAuthToken();
    }).then((token) =>{
        res.header('x-auth',token).send(newUser);
    }).catch((e)=> res.status(400).send(e.message));
    
});



app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
});

module.exports.app = app;





