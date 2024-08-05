require('dotenv').config();
const mongoose = require('mongoose');
const Books = require('../model/Book')
var jwt = require('jsonwebtoken');


exports.Books_create = async function (req, res, next) {
  try {
    if (!req.body.title || !req.body.author || !req.body.category || !req.body.description ) {
      throw new Error("Please Fill the data")
    }
    if (!req.body.createdAt) {
      req.body.createdAt = Date.now()
    }
    if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const Books_data = await Books.create(req.body)
    const Jwt_Books = jwt.sign({ id: Books_data._id },process.env.SECRET_BOOKS)
    res.status(201).json({
      status: "sucess",
      message: "Books create",
      data: Books_data,
      Jwt_Books
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Books_get = async function (req, res, next) {
  try {
    const Books_get = await Books.find().populate('author').populate('category')
    res.status(201).json({
      status: "sucess",
      message: "Books Find",
      data: Books_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Books_Update = async function (req, res, next) {
  try {
    id = req.params.id
    if (req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    } else if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const Booksupdate = await Books.findByIdAndUpdate(id, req.body)
    res.status(201).json({
      status: "sucess",
      message: "Books Update",
      data: Booksupdate,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Books_Delete = async function (req, res, next) {
  try {
    id = req.params.id
    await Books.findByIdAndDelete(id)
    res.status(201).json({
      status: "sucess",
      message: "Books Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Books_sequre = async function (req, res, next) {
  try {
    let Books_Token = req.headers.authorization
    if (!Books_Token) {
      throw new Error("TOken not found")
    }
    const Jwt_token = jwt.verify(Books_Token,process.env.SECRET_BOOKS);
    console.table(Jwt_token)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}