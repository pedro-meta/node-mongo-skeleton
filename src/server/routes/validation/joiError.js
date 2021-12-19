function joiError(error, res) {
  const responseError = [];
  error.details.forEach((error) => {
    if (error.type === "object.missing") {
      error.context.peers.forEach((err) => {
        responseError.push({
          field: err,
          message: "is required",
        });
      });
    }
    if (error.type === "object.unknown") {
      responseError.push({
        field: error.path[0],
        message: "is not allowed",
      });
    }
    if (error.type === "any.required") {
      responseError.push({
        field: error.path[0],
        message: "is required",
      });
    }
  });
  return res.send({
    error: responseError,
  });
}

module.exports = { joiError };
