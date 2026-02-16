import { Router } from "express";
import { AuthService } from "./auth.service.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import signUpSchema from "../validations/sign-up.validation.js";
import signInSchema from "../validations/sign-in.validation.js";
import verifyUserSchema from "../validations/verify-user.validation.js";
import resendVerificationCodeSchema from "../validations/resend-verification-code.validation.js";
import isAuthMiddleware from "../middlewares/isAuth.middleware.js";

const authRouter = Router();

/**
 * @openapi
 * /auth/sign-up:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SignUpInput"
 *     responses:
 *       200:
 *         description: Verification email sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
authRouter.post(
  "/sign-up",
  validateMiddleware(signUpSchema),
  AuthService.signUp,
);

/**
 * @openapi
 * /auth/sign-in:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SignInInput"
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthTokenResponse"
 *       400:
 *         description: Invalid credentials or unverified account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
authRouter.post(
  "/sign-in",
  validateMiddleware(signInSchema),
  AuthService.signIn,
);

/**
 * @openapi
 * /auth/verify-user:
 *   post:
 *     tags: [Auth]
 *     summary: Verify user with OTP code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/VerifyUserInput"
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthTokenResponse"
 *       400:
 *         description: Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
authRouter.post(
  "/verify-user",
  validateMiddleware(verifyUserSchema),
  AuthService.verifyUser,
);

/**
 * @openapi
 * /auth/resend-verification-code:
 *   post:
 *     tags: [Auth]
 *     summary: Resend OTP code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ResendVerificationCodeInput"
 *     responses:
 *       200:
 *         description: Verification email sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       400:
 *         description: User not found, already verified, or OTP not expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
authRouter.post(
  "/resend-verification-code",
  validateMiddleware(resendVerificationCodeSchema),
  AuthService.resendVerificationCode,
);

/**
 * @openapi
 * /auth/current-user:
 *   get:
 *     tags: [Auth]
 *     summary: Get the current authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
authRouter.get("/current-user", isAuthMiddleware, AuthService.currentUser);

export default authRouter;
