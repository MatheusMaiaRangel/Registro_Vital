import nodemailer from "nodemailer";

const isConfigured = !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS;

export function isMailerConfigured() {
  return isConfigured;
}

export async function sendMail({ to, subject, html }) {
  if (!isConfigured) {
    // Safety: if mailer is not configured, throw so callers know
    throw new Error("Mailer não configurado (defina SMTP_HOST, SMTP_USER e SMTP_PASS no .env)");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: (process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
}
