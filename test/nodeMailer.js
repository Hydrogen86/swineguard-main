const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'magnorobert86@gmail.com',  // Replace with your email
    pass: 'wkvcyfbxwkhrdopy',    // Use the app password if 2FA is enabled
  },
});

const mailOptions = {
  from: 'magnorobert86@gmail.com',  // Replace with your email
  to: 'magnorobert231@gmail.com',  // Replace with the recipient's email
  subject: 'Test Email',
  text: 'Hello World.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});