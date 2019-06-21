const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/movies', (req, res) => {
  const queryText = 'SELECT id, title, poster, description FROM movies';
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT movies query', err);
      res.sendStatus(500);
    });
});

router.get('/genres', (req, res) => {
    const queryText = 'SELECT id, name FROM genres';
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT movies query', err);
        res.sendStatus(500);
      });
  });

// router.get('/details/:id', (req, res) => {
//   const queryText = 'SELECT * FROM plant WHERE id=$1';
//   pool.query(queryText, [req.params.id])
//     .then((result) => { res.send(result.rows); })
//     .catch((err) => {
//       console.log('Error completing SELECT plant query', err);
//       res.sendStatus(500);
//     });
// });


module.exports = router;