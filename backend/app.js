require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const router = require("./routes");
const errorMiddleware = require("./middlewares/error-middleware");
const cookieParser = require("cookie-parser");
const ApiError = require("./error/api-error");

const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 100000 })
);
app.use(express.json({ limit: "50mb" }));

app.use(process.env.API_PREFIX, router);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const server = app.listen(process.env.PORT || 3000, () =>
      console.log(
        "\x1b[32m",
        `Server started on port:\x1b[1m ${server.address().port}`,
        "\x1b[0m"
      )
    );
  } catch (e) {
    console.log("\x1b[31m", e, "\x1b[0m");
  }
};

startServer();
