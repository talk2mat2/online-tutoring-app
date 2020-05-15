const bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  User = require('../models/user');

//Sign up User
exports.signUp = (req, res, next) => {
  const { email, password, username } = req.body;
  let role;

  if (!email) {
    res.status(400).send({
      status: false,
      message: 'Email is required to proceed',
    });
    return;
  }
  if (!password) {
    res.status(400).send({
      status: false,
      message: 'Choose a password to continue',
    });
    return;
  }
  if (!username) {
    res.status(400).send({
      status: false,
      message: 'Choose a username to continue',
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
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(423).send({
        status: false,
        message: 'Username already taken! Choose a unique one',
      });
    }
  });

  bcrypt
    .hash(password, 12)
    .then((password) => {
      let user = new User({
        email,
        password,
        username,
        userRole: 'student',
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

          { expiresIn: '3hr' }
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

  const decodedToken = await jwt.decode(
    token,
    'worldisfullofdevelopersandsolutionproviders'
  );

  // const decodedToken = await jwt.verify(
  //   token,
  //   'worldisfullofdevelopersandsolutionproviders'
  // );

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

//find by id
exports.viewUserById = async (req, res) => {
  try {
    await User.findById({ _id: req.body.id }).then((data) => {
      console.log(data);
      !data
        ? res.status(404).send({
            message: 'User do not exists',
          })
        : res.status(200).send({
            message: 'request successful',
            data,
          });
    });
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};

//view user details
exports.viewAllUser = async (req, res) => {
  try {
    await User.find({}).then((data) => {
      !data
        ? res.status('users not found')
        : res.status(200).send({
            message: 'All Users',
            data,
          });
    });
  } catch (e) {
    res.status(500).send({
      message: 'An error occured',
    });
  }
};
//turn user tutor
exports.becomeTutor = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        useFindAndModify: false,
      },
      { userRole: 'tutor' }
    ).then((data) => {
      !data
        ? res.status(404).send({
            message: 'User not found',
          })
        : res.status(200).send({
            message: 'You have successfully upgraded to  a tutor',
            data,
          });
    });
  } catch (e) {
    res.status(500).send({ message: 'An error occured' });
  }
};

//delete all users

exports.deleteAllusers = async (req, res) => {
  try {
    await User.deleteMany().then((data) => {
      !data
        ? res.status(423).send({
            message: 'Record could not be deleted at the moment',
          })
        : res.status(200).send({
            message: 'Records deleted successfully',
          });
    });
  } catch (e) {
    res.status(500).send({
      message: 'An  error occured',
    });
  }
};
