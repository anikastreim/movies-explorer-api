const linkRegExp = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;
const USER_NOT_FOUND = 'Пользователь по указанному id не найден';
const INCORRECT_USER_DATA = 'Переданы некорректные данные пользователя';
const EMAIL_ALREADY_EXISTS = 'Попытка регистрации по уже существующему в базе email';
const INCORRECT_DATA_CREATE_USER = 'Переданы некорректные данные при создании пользователя';
const INCORRECT_DATA_UPDATE_PROFILE = 'Переданы некорректные данные при обновлении профиля';
const INCORRECT_DATA_CREATE_MOVIE = 'Переданы некорректные данные при создании фильма';
const MOVIE_NOT_FOUND = 'Фильм по указанному id не найден';
const DO_NOT_HAVE_PERMISSIONS_TO_REMOVE = 'Попытка удалить чужой фильм';
const INCORRECT_DATA_DELETE_MOVIE = 'Передан некорректный id карточки';
const UNAUTHORIZED_ERROR = 'Необходима авторизация';
const INVALID_AUTH = 'Передан неверный логин или пароль';
const INVALID_EMAIL = 'Передан неправильный формат почты';
const INVALID_URL = 'Передан неправильный формат ссылки';
const PAGE_NOT_FOUND = 'Путь не найден';
const SERVER_ERROR = 'На сервере произошла ошибка';
const LIMITER_ERROR = 'Превышен лимит на количество запросов, отправляемых на сервер';

module.exports = {
  linkRegExp,
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  EMAIL_ALREADY_EXISTS,
  INCORRECT_DATA_CREATE_USER,
  INCORRECT_DATA_UPDATE_PROFILE,
  INCORRECT_DATA_CREATE_MOVIE,
  MOVIE_NOT_FOUND,
  DO_NOT_HAVE_PERMISSIONS_TO_REMOVE,
  INCORRECT_DATA_DELETE_MOVIE,
  UNAUTHORIZED_ERROR,
  INVALID_AUTH,
  INVALID_EMAIL,
  INVALID_URL,
  PAGE_NOT_FOUND,
  SERVER_ERROR,
  LIMITER_ERROR,
};
