//Internal modules
import { sendAdminInquiryEmail } from "../utils/sendEmailNotificationToAdminOnInquiry.js";
const notifyAdminOnInquiry = async (req, res, next) => {
    // This middleware runs AFTER your main controller logic
    // We listen for the finish event of the response to ensure the database save succeeded
    res.on('finish', async () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
            if (req.InquiryEmailNotificationData) {
                try {
                    await sendAdminInquiryEmail(req.InquiryEmailNotificationData);
                    console.log("Admin notified successfully via middleware.");
                } catch (error) {
                    console.error("Failed to send admin email in middleware:", error);
                }
            }
        }
    });

    next();
};

//export
export {
    notifyAdminOnInquiry
}