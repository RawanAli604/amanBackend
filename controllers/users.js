const express = require('express');

const router = express.Router();

const User = require('../models/user');

//get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-hashedPassword');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
