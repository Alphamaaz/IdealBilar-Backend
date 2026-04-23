// External modules
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import dns from "dns";

dotenv.config();

const getOTPContent = (purpose, email, otp) => {
  if (purpose === "email_verification") {
    return {
      subject: "Verify Your Idealbilar Account",
      html: `Dear User,
             Welcome to Idealbilar. Use the verification code below to verify your email address for ${email}:

                                 <b>${otp}</b>

             If you did not create this account, you can ignore this email.

            Sincerely yours,

            The Idealbilar team`,
    };
  }

  return {
    subject: "Your OTP for Password Reset",
    html: `Dear User,
           We received a request to reset the password for your Idealbilar account ${email}. Your verification code is:

                               <b>${otp}</b>

           If you did not request this code, do not share it with anyone and ignore this email.

          Sincerely yours,

          The Idealbilar team`,
  };
};

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  secure: false, // Changed from true to false for port 587
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Often helpful in local/dev environments
  },
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
  },
});

// Function to send OTP email
const sendOTPEmail = async (email, otp, purpose = "forgot_password") => {
  try {
    const { subject, html } = getOTPContent(purpose, email, otp);

    const info = await transporter.sendMail({
      from: `"Idealbilar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });
    return info;
  } catch (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
};

const sendInquiryEmail = async (email, name, type) => {
  try {
    const info = await transporter.sendMail({
      from: `"Idealbilar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${name} has sent a new ${type} inquiry`,
      html: `Dear User,
             You have received a new ${type} inquiry from ${name}.`,
    });
    return info;
  } catch (error) {
    throw new Error(`Failed to send inquiry email: ${error.message}`);
  }
};




export { sendOTPEmail, sendInquiryEmail };

