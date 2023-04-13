const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const { describe, expect, test } = require('@jest/globals');
require('dotenv').config()

const bodyParser = require('body-parser');

const authRoutes = require("../routes/auth");

app.use(bodyParser.json());
app.use('/', authRoutes);

describe('Todo API', () => {
    let token;
    let createdTodo;
  
    beforeAll((done) => {
      // Login with a valid test account and save the token
      request(app)
        .post('/login')
        .send({
          email: process.env.TEST_EMAIL,
          password: process.env.TEST_PASSWORD,
        })
        .end((err, response) => {
          token = response.body.data.token; // save the token!
          done();
        });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
  
    test('GET /todos - success - should return all todos when using a valid token', async () => {
      const response = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.data).toBeDefined();
    });
  
    test('POST /todos - success - Should create a new todo when using a valid token', async () => {
      const response = await request(app)
        .post('/todos')
        .send({
          name: 'test Todo',
          categoryId: 1,
        })
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.data).toBeDefined();
      createdTodo = response.body.data;
    });
    test('GET /todos - error - Should return an error when trying to get todos without a token', async () => {
      const response = await request(app).get('/todos');
      expect(response.statusCode).toEqual(401);
    });
  
    test('GET /todos - invalid - Should return an error when trying to get todos with an invalid token', async () => {
      const response = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer invalidToken`);
      expect(response.statusCode).toEqual(403);
    });

    test('DELETE /todos/:id - success - should delete a todo when using a valid token', async () => {
        const response = await request(app)
        .delete(`/todos/${createdTodo.id}`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual('success');
        expect(response.body.data.message).toEqual("Todo deleted successfully");
    });
  });