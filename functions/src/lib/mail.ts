import { ENV } from './env';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: ENV.fromEmail,
    pass: ENV.mailAppPassword,
  },
});

export type SendMailOptions = {
  to: string;
  subject: string;
  text: string;
};

export const sendMail = async (args: SendMailOptions) => {
  const from = ENV.fromEmail;

  await transport.sendMail({ ...args, from });
};
