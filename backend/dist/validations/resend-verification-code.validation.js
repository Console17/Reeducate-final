import Joi from "joi";
const resendVerificationCodeSchema = Joi.object({
    email: Joi.string().email().required(),
});
export default resendVerificationCodeSchema;
//# sourceMappingURL=resend-verification-code.validation.js.map