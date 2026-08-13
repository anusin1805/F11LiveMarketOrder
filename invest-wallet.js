const { Router } = require('express');
const { venturaService } = require('../services/ventura');

const investWalletRouter = Router();

// GET /api/invest/wallet/overview - Credit Line & F11 Wallet Balance
investWalletRouter.get('/invest/wallet/overview', async (req, res) => {
  const userToken = req.headers.authorization?.split(' ')[1];

  let venturaMargin = { available: 0, used: 0 };
  if (userToken) {
    try {
      venturaMargin = await venturaService.getFundDetails(userToken);
    } catch (_error) {
      // Fallback if broker session isn't linked
    }
  }

  res.json({
    success: true,
    data: {
      f11Coins: 450,
      creditLine: {
        totalLimit: 2000,
        deployed: 1500,
        utilizationPercent: 75,
      },
      brokerMargin: venturaMargin,
    },
  });
});

module.exports = { investWalletRouter };
