const Auth = require('../model/Author')
var jwt = require('jsonwebtoken');


exports.Author_create = async function (req, res, next) {
  try {
    console.log(req.body);
    if (!req.body.name || !req.body.biography ) {
      throw new Error("Please Fill the data")
    }
    if (!req.body.createdAt) {
      req.body.createdAt = Date.now()
    }
    if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const Author_data = await Auth.create(req.body)
    const Jwt_Author = jwt.sign({ id: Author_data._id },process.env.SECRET_AUTHOR)
    res.status(201).json({
      status: "sucess",
      message: "Author create",
      data: Author_data,
      Jwt_Author
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Author_get = async function (req, res, next) {
  try {
    const Author_get = await Auth.find()
    res.status(201).json({
      status: "sucess",
      message: "Author Find",
      data: Author_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Author_Update = async function (req, res, next) {
  try {
    id = req.params.id
    if (req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    } else if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const AuthorUpdate = await Auth.findByIdAndUpdate(id, req.body)
    res.status(201).json({
      status: "sucess",
      message: "Author Update",
      data: AuthorUpdate,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Author_Delete = async function (req, res, next) {
  try {
    id = req.params.id
    await Auth.findByIdAndDelete(id)
    res.status(201).json({
      status: "sucess",
      message: "Author Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Author_sequre = async function (req, res, next) {
  try {
    let Author_Token = req.headers.authorization
    if (!Author_Token) {
      throw new Error("TOken not found")
    }
    const Jwt_token = jwt.verify(Author_Token,process.env.SECRET_AUTHOR);
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}