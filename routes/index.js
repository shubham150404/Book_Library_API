require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Category = require('../model/Category')
const Book = require('../model/Book')
const User = require('../model/User')
const Author = require('../model/Author')
var jwt = require('jsonwebtoken');
const Usercontroller = require('../controller/UserController')
const CategoryController = require('../controller/CategoryController')
const Authorcontroller = require('../controller/AuthorController')
const Bookcontroller = require('../controller/BookController')


/* User */
router.post('/UserCreate',Usercontroller.User_create);

router.get('/UserGet',Usercontroller.User_sequre,Usercontroller.User_get);

router.put('/UserUpdate/:id',Usercontroller.User_sequre,Usercontroller.User_Update);

router.delete('/UserDelete/:id',Usercontroller.User_sequre,Usercontroller.User_Delete);

// Category

router.post('/Category',CategoryController.Category_create);

router.get('/CategoryData',CategoryController.Category_sequre,CategoryController.Category_get);

router.put('/CategoryUpdate/:id',CategoryController.Category_sequre,CategoryController.Category_Update);

router.delete('/CategoryDelete/:id',CategoryController.Category_sequre,CategoryController.Category_Delete);

// Author

router.post('/AuthorCreate',Authorcontroller.Author_create);

router.get('/AuthorGet',Authorcontroller.Author_sequre,Authorcontroller.Author_get);

router.put('/AuthorUpdate/:id',Authorcontroller.Author_sequre,Authorcontroller.Author_Update);

router.delete('/AuthorDelete/:id',Authorcontroller.Author_Delete,Authorcontroller.Author_Delete);



// Book

router.post('/BookCreate',Bookcontroller.Books_create);

// router.get('/BookGet',Bookcontroller.Books_sequre,Bookcontroller.Books_get);
router.get('/BookGet',Bookcontroller.Books_get);

router.put('/BookUpdate/:id',Bookcontroller.Books_sequre,Bookcontroller.Books_Update);

router.delete('/BookDelete/:id',Bookcontroller.Books_sequre,Bookcontroller.Books_Delete);


module.exports = router;
