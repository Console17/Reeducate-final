import Joi from "joi";

const verifyUserSchema = Joi.object({
  email: Joi.string().email().required(),
  otpCode: Joi.string().length(6).required(),
});

export default verifyUserSchema;
