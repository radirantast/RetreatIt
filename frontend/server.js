const express = require('express');
const path = require('path');
const app = express();
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3000;

app.use(flash());

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'terms', 'index.html'));
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fotstripeonly@gmail.com',
        pass: 'Gocs3434.'
    }
});

app.post('/', async (req, res) => {
  try {
      const { Name, Email, Text } = req.body;

      const nodeMailerOptions = {
          from: 'fotstripeonly@gmail.com',
          to: 'bacold.vvv@gmail.com',
          subject: 'RETREAT IT',
          text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Text}`
      };

      transporter.sendMail(nodeMailerOptions, (err) => console.error(err));
      res.render('course.ejs');
  } catch (err) {
      res.render('505 Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});