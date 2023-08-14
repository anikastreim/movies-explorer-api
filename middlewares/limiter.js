const rateLimiter = require('express-rate-limit');
const { LIMITER_ERROR } = require('../utils/constants');

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  max: 100,
  message: LIMITER_ERROR,
});

module.exports = limiter;
