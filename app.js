require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Online biblioteka backend darbojas');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveris palaists uz porta ${PORT}`);
});
