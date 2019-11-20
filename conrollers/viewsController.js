const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Tour = require('../models/tourModel');

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
  res.status(200).render('tour', {
    title: 'The Forest Hiker'
  });
});
