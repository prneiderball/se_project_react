const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const winston = require("winston")
const routes = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const {PORT} = process.env;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => logger.info({message: "MongoDB connected"}))
  .catch((err) => logger.error("MongoDB connection error:", err));

  // allowedOrigin whitelist
const allowedOrigins = [
  "http://localhost:3000",
  "https://prnbwtwr.twilightparadox.com",
];

// CORS config: Validates incoming origin dynamically
app.use(
  cors({
    // checks if incoming request is in allowedOrigin whitelist
  origin (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // if verified, allow
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  })
);

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use("/", routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
