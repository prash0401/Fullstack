const Movie = require("../model/dashboardModel");

exports.getMovies = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  Movie.fetchAll(page, limit)
    .then(({ movies, totalCount }) => {
      res.status(200).json({
        message: "Movies fetched successfully",
        movies: movies,
        totalCount: totalCount,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getMoviesById = (req, res, next) => {
  const id = req.params.id;
  Movie.fetchMovieById(id)
    .then((detailData) => {
      if (detailData) {
        res.status(200).json({
          data: detailData,
        });
      } else {
        res.status(404).json({ message: "Movie not found" }); // Handle movie not found case
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

// exports.getMovies = (req, res, next) => {
//   Movie.fetchAll()
//     .then((movies) => {
//       res.status(200).json({
//         message: "Movies fetched successfully",
//         movies: movies,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(err);
//     });
// };

exports.getMoviesByYearAndRuntimeWithPagination = (req, res, next) => {
  const year = 2005;
  const minRuntime = 160;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;

  Movie.findMoviesByYearAndRuntimeWithPagination(year, minRuntime, page, limit)
    .then((movies) => {
      res.status(200).json({
        message: `Movies successfully loaded`,
        page: page,
        limit: limit,
        movies: movies,
        length: movies.length,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
