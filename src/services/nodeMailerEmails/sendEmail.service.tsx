import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import WelcomeEmail from "../../constants/emails/welcomeEmail";
import { config } from "../../core/config/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.SENDER_EMAIL,
    pass: config.NODE_MAILER_APP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (to: string, name: string) => {
  try {
    const html = await render(<WelcomeEmail name={name} />);

    await transporter.sendMail({
      from: `"Otaku Growth" <${config.SENDER_EMAIL}>`,
      to,
      subject: `🔥 “Welcome to the Realm — Your Evolution Begins Now.”`,
      html,
    });
  } catch (error) {
    console.error("🚀 ~ sendWelcomeEmail ~ error:", error);
  }
};
