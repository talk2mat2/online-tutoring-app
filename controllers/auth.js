const bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  User = require('../models/user');

//Sign up User
exports.signUp = (req, res, next) => {
  const email = req.body.email,
    password = req.body.password;
  if (!email || !password) {
    res.status(400).send({
      status: false,
      message: 'All fields are required',
    });
    return;
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(423)
        .send({ status: false, message: 'This email already exists' });
    }
  });

  bcrypt
    .hash(password, 12)
    .then((password) => {
      let user = new User({
        email,
        password,
      });
      return user.save();
    })
    .then(() =>
      res.status(200).send({
        status: true,
        message: 'User registered Successfully',
      })
    )
    .catch((err) => console.log(err));
};

//Login User
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send('User not found, please provide valid credentials');
      }

      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          return res
            .status(403)
            .send(
              'Incorrect username or password, please review details and try again'
            );
        }

        const token = jwt.sign(
          { email: user.email, _id: user._id },

          'somworldisfullofdevelopersandsolutionproviders',

          { expiresIn: '1hr' }
        );

        res.status(200).send({
          _id: user._id,
          token,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.checkTokenToAuthorize = async (req, res, next) => {
  let token;
  // check token from request header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // If token doesn't exist in the request header
  if (!token) {
    return next(new Error('Please Log in and try again'));
  }
  // Decode token
  const decodedToken = await jwt.verify(
    token,
    'worldisfullofdevelopersandsolutionproviders'
  );
  // Check if user still exists
  const user = await User.findById(decodedToken._id);
  // If no user is found
  if (!user) {
    return next(new Error('This user does not exist'));
  }
  // Set user to request header
  req.user = user;
  next();
};
