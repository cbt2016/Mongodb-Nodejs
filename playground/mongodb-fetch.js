var {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log(err.message);
    }   
    console.log('connecte successfully to mongodb database');
    
    db.collection('Todos').find({completed: false}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch the data ');
    });
    
    db.collection('Todos').find({}).count().then((count)=>{
        console.log(`Todos count: ${count}`);
    },(err)=>{
        console.log(err.message);
    });
    
   // db.close();
});