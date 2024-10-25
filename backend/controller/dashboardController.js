const Movie = require("../model/dashboardModel");

exports.getMovies = (req, res, next) => {
  Movie.fetchAll()
    .then((movies) => {
      res.status(200).json({
        message: "Movies fetched successfully",
        movies: movies,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getMoviesByYearAndRuntimeWithPagination = (req, res, next) => {
  const year = 2005;
  const minRuntime = 160;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  Movie.findMoviesByYearAndRuntimeWithPagination(year, minRuntime, page, limit)
    .then((movies) => {
      res.status(200).json({
        message: `Movies successfully loaded`,
        page: page,
        limit: limit,
        movies: movies,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
