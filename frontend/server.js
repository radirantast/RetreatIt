const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Указываем Express искать HTML в папке frontend
app.use(express.static(path.join(__dirname)));

// Пример: переход на /terms отдаёт terms/index.html
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'terms', 'index.html'));
});

// Главная страница (если нужно)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});