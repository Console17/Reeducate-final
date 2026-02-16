import "dotenv/config";
declare function sendOtpCode(to: string, otpCode: string): Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
declare function sendWelcomeEmail(to: string): Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
export declare const EmailService: {
    sendOtpCode: typeof sendOtpCode;
    sendWelcomeEmail: typeof sendWelcomeEmail;
};
export {};
//# sourceMappingURL=email.service.d.ts.map