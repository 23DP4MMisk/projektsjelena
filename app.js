require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Online biblioteka backend darbojas');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveris palaists uz porta ${PORT}`);
});

const db = require('./db');

app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});