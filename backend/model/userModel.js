// const { use } = require("../routes/route");

const getDb = require("../utils/db").getDb;

class User {
  constructor(name, email, password) {
    this.name = name;
    this.password = password;
    this.email = email;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByEmail(email) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ email: email })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findByUsername(name) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ name: name })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
