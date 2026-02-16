import userModel from "../users/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { EmailService } from "../email/email.service.js";
async function signUp(req, res) {
    const { fullName, email, password, age, role } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return res.status(400).json({ message: "user already exists" });
    }
    const otpCode = Math.random().toString().slice(2, 8);
    const otpCodeExpDate = String(new Date().getTime() + 3 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
        fullName,
        email,
        password: hashedPassword,
        age,
        role,
        OTPCode: otpCode,
        OTPCodeExpirationDate: otpCodeExpDate,
    });
    await EmailService.sendOtpCode(email, otpCode);
    res.json({ message: "check email to verify" });
}
async function signIn(req, res) {
    const { email, password } = req.body;
    const existUser = await userModel.findOne({ email }).select("+password");
    if (!existUser) {
        return res.status(400).json({ message: "email or password is incorrect" });
    }
    if (!existUser.isVerified) {
        return res.status(400).json({ message: "verify email" });
    }
    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) {
        return res.status(400).json({ message: "email or password is incorrect" });
    }
    const payload = {
        userId: existUser._id,
        role: existUser.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    res.json({ token });
}
async function currentUser(req, res) {
    const user = await userModel.findById(req.userId);
    res.json(user);
}
async function verifyUser(req, res) {
    const { email, otpCode } = req.body;
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
        return res.status(400).json({ message: "user not found" });
    }
    if (!existUser.OTPCode || otpCode !== existUser.OTPCode) {
        return res.status(400).json({ message: "wrong otp code" });
    }
    if (!existUser.OTPCodeExpirationDate ||
        new Date().getTime() > parseInt(existUser.OTPCodeExpirationDate)) {
        return res.status(400).json({ message: "otp code expired" });
    }
    await userModel.findByIdAndUpdate(existUser._id, {
        OTPCode: null,
        OTPCodeExpirationDate: null,
        isVerified: true,
    });
    await EmailService.sendWelcomeEmail(email);
    const payload = {
        userId: existUser._id,
        role: existUser.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    res.json({ token });
}
async function resendVerificationCode(req, res) {
    const { email } = req.body;
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
        return res.status(400).json({ message: "user not found" });
    }
    if (existUser.isVerified) {
        return res.status(400).json({ message: "already verified" });
    }
    if (existUser.OTPCodeExpirationDate &&
        new Date().getTime() < parseInt(existUser.OTPCodeExpirationDate)) {
        return res.status(400).json({ message: "otp code not expired" });
    }
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    const otpCodeExpDate = Date.now() + 3 * 60 * 1000;
    await userModel.findByIdAndUpdate(existUser._id, {
        OTPCode: otpCode,
        OTPCodeExpirationDate: otpCodeExpDate,
    });
    await EmailService.sendOtpCode(email, otpCode);
    res.json({ message: "check email to verify" });
}
export const AuthService = {
    signUp,
    signIn,
    currentUser,
    verifyUser,
    resendVerificationCode,
};
//# sourceMappingURL=auth.service.js.map