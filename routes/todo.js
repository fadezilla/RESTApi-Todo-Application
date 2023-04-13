var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var TodoService = require("../services/TodoService")
var todoService = new TodoService(db);
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var jwt = require('jsonwebtoken');

router.use(jsend.middleware);

router.get('/', async function(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if(token == null)
    return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user)=> {
      if(err)
      return res.sendStatus(403);
      const userId = user.id;
  
    try {
      const result = await todoService.getAll(userId);
      res.jsend.success(result);
    } catch (error) {
      res.jsend.error(error);
    }
  })
});

router.post('/', jsonParser, async function(req, res, next) {
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    const token = req.headers.authorization?.split(' ')[1];
    if(token == null)
    return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user)=> {
      if(err)
      return res.sendStatus(403);
      const userId = user.id;
    try {
      const result = await todoService.create(name, categoryId, userId);
      res.jsend.success(result);
    } catch (error) {
      res.jsend.error(error);
    }
  });
});

router.delete('/:id', async function(req, res, next) {
    const todoId = req.params.id;
    const token = req.headers.authorization?.split(' ')[1];
    if(token == null)
    return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user)=>{
      if(err)
      return res.sendStatus(403);
      const userId = user.id
    try {
      const result = await todoService.delete(todoId, userId);
      if (result === 0) {
        res.status(404).jsend.fail({ message: 'Todo not found' });
      } else {
        res.jsend.success({ message: 'Todo deleted successfully' });
      }
    } catch (error) {
      res.jsend.error(error);
    }
  })
});

router.put('/:id', jsonParser, async function(req, res, next){
  const name = req.body.name;
  const categoryId = req.body.categoryId;
  const token = req.headers.authorization?.split(' ')[1];
  if(token == null)
  return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, async(err, user)=> {
    if(err)
    return res.sendStatus(403);
    const userId = user.id;
    const todoId = req.params.id;
    try{
      const todo = await todoService.getOneById(todoId);
      if(!todo) {
        return res.jsend.fail(`No todo found with the id ${todoId}`);
      }
      const updatedTodo = await todoService.update(todoId, name, categoryId);
      res.jsend.success(updatedTodo);
    } catch (error) {
      res.jsend.error(error);
    }
  });
});
module.exports = router;