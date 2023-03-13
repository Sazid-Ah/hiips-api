const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();



/*
 * Get all users
*/
router.post('/get_users',(
body('user_mobile', 'user_mobile should not be empty.').isEmpty()),
async (req, res) => {
let user = await User.find().sort({user_date:-1});
res.json({
  "status": "success",
  "data": user,
  "message": "Success."
});
});


router.post('/post', (req, res) => {
res.send('Post API')
})
module.exports = router;