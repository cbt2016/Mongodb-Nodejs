var request = require('supertest');
var expect = require('expect');

var app = require('../../server/server').app;
var {Todo} = require('../../models/todo');

var id = '68dbc9f20c1eb01308293489';

describe('GET Todos/:id',()=>{
    it('should send a 400 status if id is not valid ',(done)=>{
        request(app)
         .get('/todos/'+ id)
         .expect(400)
         .end(done)  
    });
    
    it('should send a 404 status if id is valid but no todo matching the id',(done)=>{
        request(app)
         .get('/todos/' + id)
         .expect(404)
         .end(done)  
    });
});