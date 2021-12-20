const Joi = require("joi");
const { joiError } = require("./joiError");

const joiOptions = {
  allowUnknown: false,
  abortEarly: false,
};

const updateSchema = Joi.object({
  type_of_product: Joi.string(),
  brand: Joi.string(),
  color: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  owner_id: Joi.string(),
  lost_date: Joi.string(),
  found_date: Joi.string(),
});
//type_of_product, brand, color, description, status, owner_id, lost_date, found_date
const createSchema = Joi.object({
  type_of_product: Joi.string().alphanum().min(3).max(30).required(),
  brand: Joi.string().alphanum().min(3).max(30),
  color: Joi.string().alphanum().required(),
  description: Joi.string().required(),
  // status: Joi.string().alphanum().min(3).max(30).required(),
  // owner_id: Joi.string().alphanum().min(3).max(30).required(),
  lost_date: Joi.date(),
  // found_date: Joi.string().alphanum().min(3).max(30).required(),
});

function validateCreate(req, res, next) {
  const { error, value } = createSchema.validate(req.body, joiOptions);

  if (!error || error.details.length === 0) return next();

  joiError(error, res);
}
function validateUpdate(req, res, next) {
  const { error, value } = updateSchema.validate(req.body, joiOptions);

  if (!error || error.details.length === 0) return next();

  joiError(error, res);
}
module.exports = { validateCreate, validateUpdate };
