var {MongoClient, ObjectID} = require('mongodb');

var objID = new ObjectID();
console.log(objID);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log(err.message);
    }
    console.log('connected successfully to TodoApp database');
    
   /* db.collection('Todos').insertOne({
        title: 'first todo',
        completed: true
    },(err,results)=>{
        if(err){
            return console.log('error inserting into the database');
        }
        console.log(JSON.stringify(results.ops,undefined,2));
    });*/
    
    db.collection('users').insertOne({
        _id: objID,
        name: 'simo',
        loc: 'USA'
    },(err,results)=>{
        if(err){
            return console.log('unable to insert the user into the database');
        }
        console.log(JSON.stringify(results.ops,undefined,2));
    });
    
    db.close();
});
