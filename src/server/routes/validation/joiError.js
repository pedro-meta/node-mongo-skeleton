/* eslint-disable require-jsdoc */
function joiError(error, res) {
  const responseError = [];
  error.details.forEach((error) => {
    if (error.type === 'object.missing') {
      error.context.peers.forEach((err) => {
        responseError.push({
          field: err,
          message: 'is required',
        });
      });
    }
    if (error.type === 'string.alphanum') {
      responseError.push({
        field: error.path[0],
        message: 'must contain only alpha-numeric characters',
      });
    }
    if (error.type === 'object.unknown') {
      responseError.push({
        field: error.path[0],
        message: 'is not allowed',
      });
    }
    if (error.type === 'any.required') {
      responseError.push({
        field: error.path[0],
        message: 'is required',
      });
    }
  });
  return res.status(400).send({
    error: responseError,
  });
}

module.exports = {joiError};
