var express = require('express');
const router = require('express').Router(),
  {
    create,
    findAll,
    findById,
    updateById,
    deleteById,
  } = require('../controllers/category');

// Create a new category
router.post('/createcat', create);

// Retrieve all category
router.get('/viewall-cat', findAll);

// Retrieve category by id
router.get('/view-cat-id', findById);

// update category by id
router.put('/update-cat-id', updateById);

// delete category by id
router.delete('/delete-cat-id', deleteById);

// delete category by id
router.delete('/delete-cat-id', deleteById);

module.exports = router;
