const express = require('express');

const {
  getAllReviwes,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require('./../conrollers/reviewController');

const { protect, restrictTo } = require('./../conrollers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviwes)
  .post(protect, restrictTo('user'), createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = router;
