const express = require('express');
const router = express.Router();

// Define referral-related routes here
router.get('/invest/referrals', (req, res) => {
  res.json({ message: 'Invest Referrals API working' });
});

module.exports = { investReferralsRouter: router };
