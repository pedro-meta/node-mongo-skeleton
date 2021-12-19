const Joi = require("joi");
const { joiError } = require("./joiError");

const joiOptions = {
  allowUnknown: false,
  abortEarly: false,
};

const createSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),

  lastName: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  repeat_password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),

  dateOfBirth: Joi.date(),
});

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validateCreate(req, res, next) {
  const { error, value } = createSchema.validate(req.body, joiOptions);

  if (!error || error.details.length === 0) return next();

  joiError(error, res);
}

function validateAuth(req, res, next) {
  const { error, value } = authSchema.validate(req.body, joiOptions);

  if (!error || error.details.length === 0) next();

  joiError(error, res);
}

module.exports = { validateCreate, validateAuth };
