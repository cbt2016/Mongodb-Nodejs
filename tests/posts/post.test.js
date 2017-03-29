
var request = require('supertest');
var expect = require('expect');
var app = require('./post').app;
var {Todo} = require('../../models/todo');

beforeEach((done)=>{
    Todo.remove({}).then(()=>done());
});

describe('Post',()=>{
    it('Should get a valid todo',(done)=>{
        request(app)
         .post('/todos')
         .send({text:'todo1'})
         .expect(200)
         .expect((res)=>{
            expect(res.body.text).toBe('todo1');   
         })
         .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe('todo1');
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
               expect(todos.length).toBe(0);
               done();
           }).catch((e)=> done(e))    
            
         })
         
    });
});