var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var CategoryService = require("../services/CategoryService")
var categoryService = new CategoryService(db);
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
      const result = await categoryService.getAll(userId);
      res.jsend.success(result);
    } catch (error) {
      res.jsend.error(error);
    }
  })
});

router.post('/', jsonParser, async function(req, res, next) {
    const { name } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if(token == null)
    return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user)=> {
      if(err)
      return res.sendStatus(403);
    try {
      const result = await categoryService.create(name);
      res.jsend.success(result);
    } catch (error) {
      res.jsend.error(error);
    }
  });
});

router.delete('/:id', async function(req, res, next) {
  const categoryId = req.params.id;
  const token = req.headers.authorization?.split(' ')[1];
  if(token == null)
  return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user)=>{
    if(err)
    return res.sendStatus(403);
    const userId = user.id
  try {
    const result = await categoryService.delete(categoryId, userId);
    if (result === 0) {
      res.status(404).jsend.fail({ message: 'Category not found' });
    } else {
      res.jsend.success({ message: 'Category deleted successfully' });
    }
  } catch (error) {
    res.jsend.error(error);
  }
})
});

router.put('/:id', jsonParser, async function(req, res, next) {
  const categoryId = req.params.id;
  const { name } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if(token == null)
  return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if(err)
    return res.sendStatus(403);
    try {
      const result = await categoryService.update(categoryId, name);
      if(result[0] === 0) {
        res.status(404).jsend.fail({ message: 'Category not found'});
      } else {
        res.jsend.success({ message: 'Category updated successfully!'});
      }
    } catch (error) {
      res.jsend.error(error);
    }
  })
});

module.exports = router;