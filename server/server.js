var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('../db/mongoose');
var {Todo} = require('../models/todo');


const port = process.env.PORT || 3000;

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
                return res.status(404).send();
            }
            res.send({todo});
        },(err)=>{
            res.status(404).send(err.message);
        });
    }
    
});

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
});

module.exports.app = app;





