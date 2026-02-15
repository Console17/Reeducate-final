import Joi from "joi";

const productCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
});

const productUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  quantity: Joi.number(),
  price: Joi.number(),
});

export { productCreateSchema, productUpdateSchema };
