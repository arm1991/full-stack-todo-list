const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// router
app.use("/api", router);

// Handle preflight requests
app.options("*", (req, res) => {
  res.status(204).end();
});

// middleware must be the last line
app.unsubscribe(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (err) {
    console.log(err.message);
  }
};

start();
