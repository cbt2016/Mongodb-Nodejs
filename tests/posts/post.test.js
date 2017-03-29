
var request = require('supertest');
var expect = require('expect');
var app = require('./post').app;
var {Todo} = require('../../models/todo');

var todos = [
    {
        text: "todo1"
    },
    {
        text: "todo2"
    }
];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('Post',()=>{
    it('Should get a valid todo',(done)=>{
        request(app)
         .post('/todos')
         .send({text:'todo3'})
         .expect(200)
         .expect((res)=>{
            expect(res.body.text).toBe('todo3');   
         })
         .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find({text:'todo3'}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe('todo3');
                done();
            }).catch((e)=> done(e));
            
        })
    });
    
    it('Should not save todo with invalid data',(done)=>{
        request(app)
         .post('/todos')
         .send({})
         .expect(400)    
         .end((err,res)=>{
           if(err){
               return done(err);
           }
            
           Todo.find().then((todos)=>{
               expect(todos.length).toBe(2);
               done();
           }).catch((e)=> done(e))    
            
         })
         
    });
});