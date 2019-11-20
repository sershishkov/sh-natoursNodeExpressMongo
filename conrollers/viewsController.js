const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('overview', {
    title: 'All tours'
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker'
  });
});
