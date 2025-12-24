const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

/* Регистрация */
router.post('/register', async (req, res) => {
  const { lietotaja_vards, epasts, parole } = req.body;

  const hash = await bcrypt.hash(parole, 10);

  db.query(
    'INSERT INTO users (lietotaja_vards, epasts, parole) VALUES (?, ?, ?)',
    [lietotaja_vards, epasts, hash],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Reģistrācija veiksmīga' });
    }
  );
});

/* Вход */
router.post('/login', (req, res) => {
  const { epasts, parole } = req.body;

  db.query(
    'SELECT * FROM users WHERE epasts = ?',
    [epasts],
    async (err, results) => {
      if (!results.length) return res.status(401).json({ message: 'Lietotājs nav atrasts' });

      const user = results[0];
      const ok = await bcrypt.compare(parole, user.parole);
      if (!ok) return res.status(401).json({ message: 'Nepareiza parole' });

      const token = jwt.sign(
        { id: user.kodsID, loma: user.loma },
        process.env.JWT_SECRET
      );

      res.json({ token });
    }
  );
});

module.exports = router;