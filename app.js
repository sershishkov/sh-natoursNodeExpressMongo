const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');

const app = express();
//MIDDLEWARES
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.json({
  //   status: 'Fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'Fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
