const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');
const {
  INCORRECT_DATA_CREATE_MOVIE,
  MOVIE_NOT_FOUND,
  DO_NOT_HAVE_PERMISSIONS_TO_REMOVE,
  INCORRECT_DATA_DELETE_MOVIE,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { name, link } = req.body;
  Movie.create({ name, link, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err instanceof 'ValidationError') {
        return next(new BadRequestError(INCORRECT_DATA_CREATE_MOVIE));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        next(new ForbiddenError(DO_NOT_HAVE_PERMISSIONS_TO_REMOVE));
      }
    })
    .catch((err) => {
      if (err instanceof 'CastError') {
        return next(new BadRequestError(INCORRECT_DATA_DELETE_MOVIE));
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
