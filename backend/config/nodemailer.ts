import nodemailer from "nodemailer";
import { EMAIL_THINGS } from "./environmentvariable";

export const transporter = nodemailer.createTransport({
    host: EMAIL_THINGS.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_THINGS.EMAIL_USERNAME,
        pass: EMAIL_THINGS.EMAIL_PASSWORD,
    },
});