var {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log(err.message);
    }
    console.log('connected successfully to the database');
    
    /*db.collection('Todos').deleteMany({completed:true}).then((res)=>{
        console.log(JSON.stringify(res,undefined,2));
    },(err)=>{
        console.log(err.message);
    });*/
    
    /*db.collection('Todos').deleteOne({completed:false}).then((res)=>{
        console.log(JSON.stringify(res,undefined,2));
    },(err)=>{
        console.log(err.message);
    });*/
    
    db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
        console.log(JSON.stringify(res,undefined,2));
    },(err)=>{
        console.log(err.message);
    });
    
});