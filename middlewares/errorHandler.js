const { DEBUG_MODE } = require("../config/index.js");
const Joi = require("joi");
const CustomErrorHandler = require("../services/CustomErrorHandler.js");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "Internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof Joi.ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.statusCode;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

module.exports = errorHandler;
