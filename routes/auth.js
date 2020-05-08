var express = require('express');
const router = require('express').Router(),
  { signUp, login, checkTokenToAuthorize } = require('../controllers/auth');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express platform',
  });
});
router.post('/signup', signUp);

module.exports = router;
