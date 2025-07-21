const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'terms', 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fotstripeonly@gmail.com',
        pass: 'eeno urtw gdog yguh'
    }
});

app.post('/', async (req, res) => {
  const { Name, Email, Text } = req.body;

  const nodeMailerOptions = {
      from: 'fotstripeonly@gmail.com',
      to: 'bacold.vvv@gmail.com',
      subject: 'Retreat',
      text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Text}\n`
  };

  transporter.sendMail(nodeMailerOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.status(200);
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});