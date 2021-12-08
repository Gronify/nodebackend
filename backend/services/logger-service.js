const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.splat(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
    })
  );
} else {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
    })
  );
  logger.add(
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
    })
  );
  logger.add(
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    })
  );
}

module.exports = logger;
