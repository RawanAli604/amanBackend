
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyAdmin;
