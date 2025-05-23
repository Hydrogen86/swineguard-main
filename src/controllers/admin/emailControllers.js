const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendAppointmentEmail = async (req, res) => {
    const { clientEmail, message } = req.body;
    
    // Check if both clientEmail and message are provided
    if (!clientEmail || !message) {
        return res.status(400).json({ message: "Missing email or message." });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: clientEmail,
        subject: 'Appointment Confirmation - SwineGuard',
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email failed:', error);
        if (error.response) {
            console.error('SMTP Error Response:', error.response);
        }
        return res.status(500).json({ message: 'Email sending failed' });
    }
};
