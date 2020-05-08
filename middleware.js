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
