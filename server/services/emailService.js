import nodemailer from "nodemailer";

// Create a transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ashishbadhe97@gmail.com",
    pass: "ousmqbmyqtkffeaw",
  },
});

export const sendEmail = (receiverEmail, subject, text, content) => {
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: receiverEmail,
    subject,
    text,
    html: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error.toString());
    }

    console.log("Email sent successfully:", info.response);
  });
};
