const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send proposal confirmation email to client
const sendProposalConfirmation = async (proposalData) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: proposalData.email,
            subject: 'Proposal Received - Influencer Elite',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #7701d0, #b7f700); padding: 20px; text-align: center; border-radius: 8px;">
                        <h1 style="color: white; margin: 0;">Influencer Elite</h1>
                    </div>
                    <div style="padding: 30px; background: #f9f9f9;">
                        <h2 style="color: #333;">Thank You for Your Interest!</h2>
                        <p style="color: #666; line-height: 1.6;">
                            Hi ${proposalData.firstName},
                        </p>
                        <p style="color: #666; line-height: 1.6;">
                            We've received your proposal request for <strong>${proposalData.company}</strong>. 
                            Our team will review your information and contact you within 24-48 hours to discuss your campaign goals.
                        </p>
                        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #b7f700;">
                            <h3 style="margin-top: 0; color: #333;">Your Submission Details:</h3>
                            <p><strong>Company:</strong> ${proposalData.company}</p>
                            <p><strong>Budget Range:</strong> ${proposalData.budget}</p>
                            <p><strong>Campaign Goals:</strong> ${proposalData.goals}</p>
                        </div>
                        <p style="color: #666; line-height: 1.6;">
                            In the meantime, feel free to <a href="${process.env.DOMAIN_URL}" style="color: #7701d0; text-decoration: none;">explore our gallery</a> to see successful campaigns we've executed.
                        </p>
                        <p style="color: #666; line-height: 1.6;">
                            <strong>Best regards,</strong><br/>
                            The Influencer Elite Team<br/>
                            <a href="${process.env.DOMAIN_URL}" style="color: #7701d0; text-decoration: none;">${process.env.DOMAIN_URL}</a>
                        </p>
                    </div>
                    <div style="background: #333; color: #fff; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
                        <p>© 2024 Influencer Elite. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Confirmation email sent to:', proposalData.email);
        return true;
    } catch (error) {
        console.error('❌ Error sending confirmation email:', error);
        return false;
    }
};

// Send proposal notification to admin
const sendProposalNotification = async (proposalData) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `New Proposal Request - ${proposalData.company}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #333; color: white; padding: 20px;">
                        <h1 style="margin: 0;">New Proposal Request</h1>
                    </div>
                    <div style="padding: 30px; background: #f9f9f9;">
                        <h2 style="color: #333;">Client Information:</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px; font-weight: bold;">Name:</td>
                                <td style="padding: 10px;">${proposalData.firstName} ${proposalData.lastName}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px; font-weight: bold;">Email:</td>
                                <td style="padding: 10px;"><a href="mailto:${proposalData.email}">${proposalData.email}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px; font-weight: bold;">Company:</td>
                                <td style="padding: 10px;">${proposalData.company}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px; font-weight: bold;">Budget:</td>
                                <td style="padding: 10px;">${proposalData.budget}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; font-weight: bold;">Goals:</td>
                                <td style="padding: 10px;">${proposalData.goals}</td>
                            </tr>
                        </table>
                        <p style="margin-top: 20px; color: #666;">
                            <a href="${process.env.DOMAIN_URL}/admin/proposals" style="background: #7701d0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View in Admin Panel</a>
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Admin notification sent');
        return true;
    } catch (error) {
        console.error('❌ Error sending admin notification:', error);
        return false;
    }
};

// Send contact form response
const sendContactResponse = async (email, name, message) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'We Received Your Message - Influencer Elite',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #7701d0, #b7f700); padding: 20px; text-align: center; border-radius: 8px;">
                        <h1 style="color: white; margin: 0;">Influencer Elite</h1>
                    </div>
                    <div style="padding: 30px; background: #f9f9f9;">
                        <h2 style="color: #333;">Hello ${name},</h2>
                        <p style="color: #666; line-height: 1.6;">
                            Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
                        </p>
                        <p style="color: #666; line-height: 1.6;">
                            <strong>Your Message:</strong><br/>
                            ${message}
                        </p>
                        <p style="color: #666; line-height: 1.6; margin-top: 30px;">
                            Best regards,<br/>
                            The Influencer Elite Team
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Contact response email sent to:', email);
        return true;
    } catch (error) {
        console.error('❌ Error sending contact response:', error);
        return false;
    }
};

module.exports = {
    transporter,
    sendProposalConfirmation,
    sendProposalNotification,
    sendContactResponse
};
