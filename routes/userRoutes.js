const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
  //  .get(userController.getAllUsers)
  .post(userController.createNewUser)
//  .patch(usersController.updateUser)
//  .delete(usersController.deleteUser);

module.exports = router;