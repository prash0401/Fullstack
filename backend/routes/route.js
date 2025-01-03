const express = require("express");
const AuthController = require("../controller/userController");
const DashboardController = require("../controller/dashboardController");
const validation = require("../validationSchema/validation");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.post("/signup", validation.signupValidation, AuthController.singup);

router.post("/login", AuthController.login);

router.get(
  "/movies",
  //  isAuth,
  DashboardController.getMovies
);

router.get("/movies/:id", DashboardController.getMoviesById);

router.post(
  "/dashboard",
  // isAuth,
  DashboardController.getMoviesByYearAndRuntimeWithPagination
);

module.exports = router;
