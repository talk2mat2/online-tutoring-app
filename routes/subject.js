var express = require('express');
const router = require('express').Router(),
  {
    create,
    findAll,
    findById,
    updateById,
    deleteById,
    deleteAll,
  } = require('../controllers/subject');

// Create a new subject
router.post('/create-sub', create);

// Retrieve all subject
router.get('/viewallsubjects', findAll);

// Retrieve subject by id
router.get('/viewsubjectbyid', findById);

// Retrieve subject by id
router.get('/view', findById);

// update subject by id
router.put('/updatesubjectbyid', updateById);

// delete subject by id
router.delete('/deletesubjectbyid', deleteById);

// delete all subject
router.delete('/deleteallsub', deleteAll);

module.exports = router;
