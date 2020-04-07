const {Genre, validate} = require('../models/genres')

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); // same as app but for routes

// get

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('This genre does not exists.');

  res.send(genre);
});

// post

router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);

});

// put

router.put('/:id', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });

  if (!genre) return res.status(404).send('This genre does not exists.');

  res.send(genre);
});



// delete

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('This genre does not exists.');

  res.send(genre);
});


module.exports = router;
