var request = require('supertest');
var expect = require('expect');

var app = require('../../server/server').app;
var {Todo} = require('../../models/todo');

describe('GET',()=>{
    it('should return todos from database',(done)=>{
        request(app)
         .get('/todos')
         .expect(200)
         .expect((res)=>{
            expect(res.body.todos.length).toBe(2);   
         })
         .end(done)
    });
});