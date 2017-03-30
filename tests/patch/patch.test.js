var request = require('supertest');
var expect = require('expect');

var app = require('../../server/server').app;
var {Todo} = require('../../models/todo');

describe('PATCH',()=>{
    it('should return 404 if id is not valid', (done)=>{
        request(app)
         .patch('/todos/1245')
         .send({})
         .expect(404)
         .end(done)
    });
    
});