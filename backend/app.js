const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const appRoutes = require("./routes/route");
const { MongoConnect } = require("./utils/db");

app.use(cors());

app.use(express.json());

app.use(appRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "error";
  res.status(status).send(message);
});

MongoConnect(() => {
  app.listen(port, () => console.log(`app is running on ${port}`));
});
