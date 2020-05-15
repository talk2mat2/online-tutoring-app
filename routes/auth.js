var express = require('express');
const router = require('express').Router(),
  {
    signUp,
    login,
    checkTokenToAuthorize,
    becomeTutor,
    viewAllUser,
    viewUserById,
    deleteAllusers,
  } = require('../controllers/auth');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express platform',
  });
});
router.post('/signup', signUp);
router.post('/login', login);
router.get('/users', viewAllUser);
router.get('/viewuserbyid', viewUserById);
router.delete('/deleteusers', deleteAllusers);
router.put('/become-tutor', becomeTutor);
router.use(checkTokenToAuthorize);
module.exports = router;
