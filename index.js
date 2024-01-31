require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 6786;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.elasticemail.com',
  port: process.env.EMAIL_PORT || '2525',
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME || 'adx-marketing@adxfactor.com',
    pass: process.env.EMAIL_PASSWORD || 'FE6F4B89A3A33B0CAD868D1566F2BD308414',
  },
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/sendmail', (req, res) => {
  const { name ,email , phone , subject ,message } = req.body;
  const mailOptions = {
    from: 'adx-marketing@adxfactor.com',
    to: 'waqardevops134@gmail.com',
    subject: `Query from ${name}`,
    text: `Name: ${name} Email:${email} Phone:${phone} Subject:${subject} Message:${message}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({ status: '0', message: 'Internal server error. Please try again' });
    } else {
      return res.json({ status: '1', message: 'Message sent successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
