const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://prashant:prash@nodes.qvuvs.mongodb.net/sample_mflix"
  )
    .then((result) => {
      _db = result.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No db found";
};

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;
