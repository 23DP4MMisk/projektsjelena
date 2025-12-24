const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const { requireUser, requireAdmin } = require('../middleware/roles');

const router = express.Router();

/* Все книги */
router.get('/', auth, requireUser, (req, res) => {
  db.query(
    'SELECT ISBN, nosaukums, autors, gads, apraksts FROM Gramata',
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

/* Поиск */
router.get('/search', auth, requireUser, (req, res) => {
  const q = `%${req.query.q}%`;

  db.query(
    'SELECT * FROM Gramata WHERE nosaukums LIKE ? OR autors LIKE ?',
    [q, q],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

/* Фильтр по жанру */
router.get('/filter', auth, requireUser, (req, res) => {
  db.query(
    'SELECT * FROM Gramata WHERE Zanra_ID = ?',
    [req.query.zanrs],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

/* Добавить книгу (admin) */
router.post('/', auth, requireAdmin, (req, res) => {
  const g = req.body;

  db.query(
    `INSERT INTO Gramata 
    (ISBN, nosaukums, gads, apraksts, lapu_skaits, faila_pdf, audio_datne, autors, Zanra_ID)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      g.ISBN,
      g.nosaukums,
      g.gads,
      g.apraksts,
      g.lapu_skaits,
      g.faila_pdf,
      g.audio_datne,
      g.autors,
      g.Zanra_ID
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Grāmata pievienota' });
    }
  );
});

/* 📥 СКАЧИВАНИЕ */
router.get('/:isbn/download', auth, requireUser, (req, res) => {
  const isbn = req.params.isbn;

  db.query(
    'SELECT faila_pdf FROM Gramata WHERE ISBN = ?',
    [isbn],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result.length) return res.sendStatus(404);

      // логируем скачивание
      db.query(
        'INSERT INTO Lejupielade (Gramatas_ID, Lietotaja_ID) VALUES (?, ?)',
        [isbn, req.user.id]
      );

      // отдаём файл
      res.download(result[0].faila_pdf);
    }
  );
});

module.exports = router;
