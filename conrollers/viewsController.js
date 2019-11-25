const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  //Get tour data
  const tours = await Tour.find();

  //Build template

  //render that template using tour data

  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // get the data, for the request tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  //Build template

  // Render template using data
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
});

exports.getAccount = (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    { new: true, runValidators: true }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
