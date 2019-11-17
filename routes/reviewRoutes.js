const express = require('express');

const {
  getAllReviwes,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setTourUserIds
} = require('./../conrollers/reviewController');

const { protect, restrictTo } = require('./../conrollers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReviwes)
  .post(restrictTo('user'), setTourUserIds, createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
