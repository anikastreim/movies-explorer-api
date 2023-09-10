const router = require('express').Router();
const {
  getCurrentUser, updateProfile,
} = require('../controllers/users');
const { validationUpdateProfile } = require('../utils/validation');

router.get('/me', getCurrentUser);

router.patch('/me', validationUpdateProfile, updateProfile);

module.exports = router;
