const Joi = require('joi');

const SALE = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().min(1).required(),
});

const validateSale = (req, _res, next) => {
  const { error } = SALE.validate(req.body);

  if (error && error.details[0].message.includes('required')) {
    next({ status: 400, message: error.details[0].message });
  }
  if (error && error.details[0].message.includes('must be')) {
    next({ status: 422, message: error.details[0].message });
  }
  next();
};

module.exports = validateSale;