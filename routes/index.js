const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { validationLogin, validationCreateUser } = require('../utils/validation');
const { PAGE_NOT_FOUND } = require('../utils/constants');

router.post('/signin', validationLogin, login);

router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/users', require('./users'));

router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
