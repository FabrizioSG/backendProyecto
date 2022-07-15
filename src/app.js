const express = require("express");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
var cors = require('cors');
const app = express();
const photosRouter = require("./routes/photos.router");
const albumsRouter = require("./routes/albums.router");
const usersRouter = require("./routes/users.router");
const port = 3010;

//URL que se obtiene de mongoDB (atlas)

const url = "mongodb+srv://MainUser:Fergus2022@cluster0.oec8j.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World from Express!!!!");
});

app.use("/api/users", usersRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/photos", photosRouter);


app.use((req, res) => {
  const error = new HttpError("Could not find this route..", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error ocurred!!" });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// nodemon
// npm install -D nodemon
