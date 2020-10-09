require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const promptsRouter = require("./Prompts/prompts-router");
const usersRouter = require('./Users/users-router');
const loginRouter = require('./Login/login-router');
// const savedGamesRouter = require('./Login/login-router')


const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


app.use("/api/prompts", promptsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
// app.use("/api/saved-games", savedGamesRouter);





app.get("/", (req, res) => {
  res.send("Hello, Caleb!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

// app.use(cors());

module.exports = app;
