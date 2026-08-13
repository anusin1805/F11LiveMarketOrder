const express = require('express');
const router = express.Router();

// Define user-related routes here
router.get('/invest/users', (req, res) => {
  res.json({ message: 'Invest Users API working' });
});

module.exports = { investUsersRouter: router };
