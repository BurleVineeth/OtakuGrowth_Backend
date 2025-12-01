import { Resend } from "resend";
import { render } from "@react-email/render";
import WelcomeEmail from "../../constants/emails/welcomeEmail";
import { config } from "../../core/config/env";

const resend = new Resend(config.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  const html = await render(<WelcomeEmail name={name} />);

  return await resend.emails.send({
    from: "Otaku Growth <onboarding@resend.dev>",
    to,
    subject: "Welcome!",
    html,
  });
}
