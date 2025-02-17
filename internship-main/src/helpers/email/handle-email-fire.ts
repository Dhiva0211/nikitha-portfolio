import nodemailer from 'nodemailer';

type Payload = {
  to: string;
  subject: string;
  html: string;
};

const smtpSettings = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT ?? '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const handleEmailFire = async (data: Payload) => {
  const transporter = nodemailer.createTransport({
    ...smtpSettings,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...data,
  });
};

export default handleEmailFire;
