const Joi = require('joi');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProduct = (req, _res, next) => {
  const { error } = PRODUCT.validate(req.body);

  if (error && error.details[0].message.includes('required')) {
    next({ status: 400, message: error.details[0].message });
  }
  if (error && error.details[0].message.includes('must be')) {
    next({ status: 422, message: error.details[0].message });
  }
  next();
};

module.exports = validateProduct;