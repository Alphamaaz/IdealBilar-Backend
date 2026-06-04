//External modules
import nodemailer from "nodemailer";
//Internal modules

// Your existing transporter configuration (Keep using whatever you used for OTP)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send Admin Inquiry Notification
const sendAdminInquiryEmail = async ({
  name,
  email,
  message,
  Inquiry,
  Motor = "",
  ClosestDealer = ""
}) => {
  try {
    const mailOptions = {
      from: `New Inquiry from ${Inquiry} <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // The client/admin's email address
      replyTo: email,
      subject: `🚨 Inquiry  from [${Inquiry}] send by ${name}`,

      // Critical headers to prevent threading
      'In-Reply-To': '',  // Empty - breaks the chain
      'references': '',      // Empty - breaks the chain
      
      headers: {
        'X-Auto-Response-Suppress': 'All',
        'X-MS-Exchange-Organization-AutoReplySuppress': 'All',
        'Precedence': 'bulk',  // Prevents auto-replies
        'Auto-Submitted': 'auto-generated',
      },

      html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px;">
                <h2 style="color: #333;">New Inquiry Received</h2>
                <p>An inquiry has been submitted regarding a ${Inquiry} Service. Here are the details:</p>
                <hr style="border: 0; border-top: 1px solid #eee;" />
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; width: 30%;">Customer Name:</td>
                        <td style="padding: 8px 0;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Customer Email:</td>
                        <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    ${Motor ?
                        `<tr>
                        <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Motor:</td>
                        <td style="padding: 8px 0;">${Motor}</td>
                        </tr>`
                        :
                        ""
                        }
                        ${ClosestDealer ?
                           `<tr>
                        <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Closest Dealer:</td>
                        <td style="padding: 8px 0;">${ClosestDealer}</td>
                        </tr>`
                        :
                        ""
                        }
                        <tr>
                        <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
                        <td style="padding: 8px 0;">${message}</td>
                    </tr>
                </table>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error in send Admin Inquiry email ", error.message);
    throw error;
  }
};

//export
export { sendAdminInquiryEmail };
