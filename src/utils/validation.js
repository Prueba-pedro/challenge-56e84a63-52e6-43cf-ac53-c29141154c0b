const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required()
});

const validateProduct = (product) => {
  return productSchema.validate(product);
};

module.exports = { validateProduct };