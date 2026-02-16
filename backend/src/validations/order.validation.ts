import Joi from "joi";

const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("preparing", "shipped", "delivered", "refunded")
    .required(),
});

export default updateOrderStatusSchema;
