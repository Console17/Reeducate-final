import Joi from "joi";

const cartItemSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const addToCartSchema = cartItemSchema;

const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

export { addToCartSchema, updateCartItemSchema };
