const { validationResult } = require("express-validator");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.singup = (req, res, next) => {
  const errors = validationResult(req);
  const { name, email, password } = req.body;
  if (!errors.isEmpty()) {
    const error = new Error();
    error.statusCode = 403;
    error.data = errors.array();
    throw error;
  }
  User.findByEmail(email)
    .then((res) => {
      const user = new User(name, email, password);
      return user.save();
    })
    .then((message) => {
      res.status(200).send({
        message: "sign up successful",
        id: message.insertedId,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let signedUser;

  User.findByEmail(email)
    .then((user) => {
      console.log(user, "user");
      if (!user) {
        const error = new Error("email is not found");
        error.statusCode = 401;
        throw error;
      }
      signedUser = user;

      return user.password === password;
    })
    .then((data) => {
      if (!data) {
        const error = new Error();
        error.statusCode = 401;
        error.data = "password is not matched";
        throw error;
      }
      const token = jwt.sign(
        {
          email: signedUser.email,
          userId: signedUser._id.toString(),
        },
        "Fulham@chelsea&Liverpool",
        { expiresIn: "24h" }
      );
      return res.status(200).send({
        token: token,
        message: "Logged in ",
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
