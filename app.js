const mongoose = require('mongoose'),
  createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  authRoutes = require('./routes/auth'),
  subjectRoutes = require('./routes/subject'),
  // categoryRoutes = require('./routes/category'),
  app = express(),
  db =
    'mongodb+srv://okeken:TYZhw85bkMNEjMxJ@cluster0-msnz6.mongodb.net/test?retryWrites=true&w=majority';
const port = process.env.PORT || 7000;
mongoose

  .connect(
    db,

    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  .then((result) => {
    console.log('Database connected');

    app.listen(`${port}`);
  })

  .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(subjectRoutes);
//app.use(categoryRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
