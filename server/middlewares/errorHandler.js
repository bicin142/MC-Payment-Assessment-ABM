function errorHandler(err, req, res, next) {
  let status;
  let message;
  let name;

  switch (err.name) {
    case "SequelizeValidationError":
      name = "Input Validation Error";
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      name = "Input Unique Constraint Error";
      status = 400;
      message = err.errors[0].message;
      break;
    case "BadRequest":
      name = "Bad Request";
      status = 400;
      message = err.message;
      break;
    case "JsonWebTokenError":
      name = "Authentication Error";
      status = 401;
      message = "Please login first";
      break;
    case "InvalidLogin":
      name = "Invalid Login Error";
      status = 401;
      message = "Invalid email or password";
      break;
    case "Forbidden":
      name = "Forbidden Error";
      status = 403;
      message = "You are not authorized";
      break;
    case "NotFound":
      name = "Not Found Error";
      status = 404;
      message = err.message;
      break;
    default:
      name = "Internal Server Error";
      status = 500;
      message = err;
      break;
  }
  res.status(status).json({ name, message });
}

module.exports = errorHandler;
