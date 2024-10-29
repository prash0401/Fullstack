const getDb = require("../utils/db").getDb;
const { ObjectId } = require("mongodb");

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

  static fetchAll(page = 1, limit = 10) {
    const db = getDb();
    const skip = (page - 1) * limit;

    return db
      .collection("movies")
      .aggregate([
        {
          $facet: {
            movies: [{ $skip: skip }, { $limit: limit }],
            totalCount: [{ $count: "count" }],
          },
        },
      ])
      .toArray()
      .then((result) => {
        const movies = result[0].movies;
        const totalCount = result[0].totalCount[0]?.count || 0;
        return { movies, totalCount };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchMovieById(id) {
    console.log("id", id);
    const db = getDb();
    return db
      .collection("movies")
      .findOne({ _id: new ObjectId(id) })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // static fetchAll() {
  //   const db = getDb();
  //   return db
  //     .collection("movies")
  //     .find()
  //     .toArray()
  //     .then((movies) => {
  //       return movies;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  static findMoviesByYearAndRuntimeWithPagination(
    year,
    minRuntime,
    page,
    limit
  ) {
    const db = getDb();
    const skip = (page - 1) * limit;
    console.log("page", page, "limit", limit, "skip", skip);
    return (
      db
        .collection("movies")
        .find({ year: year, runtime: { $gt: minRuntime } })
        // .find({
        //   year: year,
        //   runtime: { $gt: minRuntime },
        // })
        .skip(skip)
        .limit(limit)
        .toArray()
        .then((movies) => {
          return movies;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }
}

module.exports = Movie;
