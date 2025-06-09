import nodemailer from "nodemailer"; // use consistent casing

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE, // optional if you're using host + port
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Gym Contact Form" <${process.env.SMTP_MAIL}>`, // adds a friendly label
    to: options.email,
    subject: options.subject,
    text: `${options.message}\n\nEmail of User: ${options.userEmail}`,
  };

  await transporter.sendMail(mailOptions);
};
