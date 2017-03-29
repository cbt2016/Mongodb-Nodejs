var express = require('express');
var bodyParser = require('body-parser');

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

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
});






