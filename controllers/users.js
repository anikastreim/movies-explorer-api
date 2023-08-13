const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');
const {
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  EMAIL_ALREADY_EXISTS,
  INCORRECT_DATA_CREATE_USER,
  INCORRECT_DATA_UPDATE_PROFILE,
} = require('../utils/constants');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof 'ValidationError') {
        next(new BadRequestError(INCORRECT_USER_DATA));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }
      if (err instanceof 'ValidationError') {
        return next(new BadRequestError(INCORRECT_DATA_CREATE_USER));
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof 'ValidationError') {
        return next(new BadRequestError(INCORRECT_DATA_UPDATE_PROFILE));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, {
          expiresIn: '7d',
        }),
      });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  updateProfile,
  login,
};
