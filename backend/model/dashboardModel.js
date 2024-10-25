const getDb = require("../utils/db").getDb;

class Movie {
  constructor(title, genre, releaseDate) {
    this.title = title;
    this.genre = genre;
    this.releaseDate = releaseDate;
  }

  save() {
    const db = getDb();
    return db
      .collection("movies")
      .insertOne(this)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("movies")
      .find()
      .toArray()
      .then((movies) => {
        return movies;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findMoviesByYearAndRuntimeWithPagination(
    year,
    minRuntime,
    page,
    limit
  ) {
    const db = getDb();
    const skip = (page - 1) * limit;

    return db
      .collection("movies")
      .find({
        year: year,
        runtime: { $gt: minRuntime },
      })
      .skip(skip)
      .limit(limit)
      .toArray()
      .then((movies) => {
        return movies;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Movie;
