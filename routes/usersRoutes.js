const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('./../conrollers/usersController');

const { signup, login } = require('./../conrollers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
