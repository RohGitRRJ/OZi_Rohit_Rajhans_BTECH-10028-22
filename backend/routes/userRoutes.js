const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  updateProfile, 
  changePassword, 
  deleteAccount 
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { 
  updateProfileValidation, 
  changePasswordValidation 
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

router.route('/profile')
  .get(getProfile)
  .put(updateProfileValidation, updateProfile)
  .delete(deleteAccount);

router.put('/password', changePasswordValidation, changePassword);

module.exports = router;
