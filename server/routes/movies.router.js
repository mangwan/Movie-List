const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//get route to get movies from database
router.get('/movies', (req, res) => {
  const queryText = 'SELECT * FROM movies';
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT movies query', err);
      res.sendStatus(500);
    });
});

//get route to individual movie from database
router.get('/movie/:id', (req, res) => {
  const queryText = `SELECT * FROM movies WHERE id = {req.params.id}`;
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT movies query', err);
      res.sendStatus(500);
    });
});

//get route to get genres from database
router.get('/movie_genres/:movie_id', (req, res) => {
    const queryText = `SELECT genres.name 
    FROM genres 
    JOIN movie_genres ON movie_genres.genres_id=genres.id
    WHERE movie_genres.movies_id = ${req.params.movie_id}`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT movies query', err);
        res.sendStatus(500);
      });
  });

  //put route to update movie title and description
  router.put('/', (req, res) => {
    cpool.query(`UPDATE "movies"
    SET "title"=$1,
    "description"=$2
    WHERE "id"=$3;`,
    [req.body.title, req.body.description, req.params.id])
    .then(result => res.send(result.rows[0]))
    .catch(error => {
        console.log('error in SELECT movies query', error);
        res.sendStatus(500);
    });
});

module.exports = router;
