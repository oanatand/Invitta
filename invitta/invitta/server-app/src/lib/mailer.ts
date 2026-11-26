import nodemailer, { type Transporter } from "nodemailer";

/**
 * Outgoing email over SMTP (works with Gmail, Outlook, Brevo, Mailgun, SES…). Configure in .env:
 *   SMTP_HOST, SMTP_PORT (587 default), SMTP_USER, SMTP_PASS, MAIL_FROM ("Invitta <no-reply@domeniu.ro>")
 * Without SMTP_HOST nothing is sent: the message is printed in the server console instead, so the
 * feature can be tried locally.
 */
let transport: Transporter | null = null;

export const mailConfigured = () => Boolean(process.env.SMTP_HOST);

function getTransport(): Transporter {
  if (!transport) {
    const port = Number(process.env.SMTP_PORT) || 587;
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
  }
  return transport;
}

export type Mail = { to: string; subject: string; text: string; html: string };

export async function sendMail(mail: Mail): Promise<void> {
  if (!mailConfigured()) {
    console.log(`[mail:not-sent] SMTP_HOST is not set. Would have sent to ${mail.to}:\n${mail.subject}\n\n${mail.text}\n`);
    return;
  }
  await getTransport().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}
