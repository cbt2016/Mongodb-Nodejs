var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('error');
    }
    console.log('module is connected : ');
    
    db.collection('Todos').findOneAndUpdate(
        {
            _id: new ObjectID('58db68b42aaa9539a7de988a')
        },
        {
            $set: {
                title: 'Jogging'
            },
           /* $unset: {
                done : ''
            },*/
            $set: {
                completed: true
            }
            
            
        },
        {
            returnOriginal: false
        }
        ).then((res)=>{
        console.log(JSON.stringify(res,undefined,2));
        },(err)=>{
        console.log(err.message);
    });
});
