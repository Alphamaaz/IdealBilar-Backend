// External modules
const nodemailer = require("nodemailer");

require("dotenv").config();

// Create a transporter using your email service credentials
 const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });
    
// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
    try {
    // Define email options
    const info = await transporter.sendMail({
      from: `"Idealbilar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Password Reset",
      html: `Dear User,
             We received a request to access your Idealbilar Account ${email} through your email address. Your verification code is:

                                  <b>${otp}</b>

             If you did not request this code, it is possible that someone else is trying to access the Idealbilar Account ${email}. Do not forward or give this code to anyone.
            
            Sincerely yours,

            The Idealbilar team`,
    });
    return info;
  } catch (error) {
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOTPEmail;
