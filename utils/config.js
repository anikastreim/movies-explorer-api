require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;
const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  NODE_ENV,
  PORT,
  DB_URL,
  SECRET_KEY,
};
