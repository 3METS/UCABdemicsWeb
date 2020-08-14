const boom = require('boom');

function validate(data, schema) {
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    const error = req[check].id
      ? validate(req[check].id, schema)
      : validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = {
  validationHandler,
};
