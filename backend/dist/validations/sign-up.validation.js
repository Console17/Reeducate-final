import Joi from "joi";
const signUpSchema = Joi.object({
    fullName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    age: Joi.number().max(100).required(),
    role: Joi.string().valid("customer", "admin").default("customer"),
});
export default signUpSchema;
//# sourceMappingURL=sign-up.validation.js.map