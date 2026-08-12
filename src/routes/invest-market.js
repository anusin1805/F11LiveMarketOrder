const { Router } = require('express');
const { venturaService } = require('../services/ventura');

const investMarketRouter = Router();

// GET /api/invest/market/status - Check Ventura Integration Status
investMarketRouter.get('/invest/market/status', async (_req, res) => {
  res.json({
    status: 'connected',
    broker: 'Ventura Securities',
    api: 'EaseAPI',
    liveTradingEnabled: true,
  });
});

// GET /api/invest/market/quote/:symbol - Fetch Live Market Quote
investMarketRouter.get('/invest/market/quote/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const quote = await venturaService.getMarketQuote(symbol);
    res.json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || 'Market data unavailable' });
  }
});

// POST /api/invest/market/trade - Execute Live Ventura Trade
investMarketRouter.post('/invest/market/trade', async (req, res) => {
  try {
    const userToken = req.headers.authorization?.split(' ')[1];
    if (!userToken) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Ventura session required' });
    }

    const tradeResult = await venturaService.placeOrder(userToken, req.body);
    res.json({ success: true, data: tradeResult });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message || 'Trade execution failed' });
  }
});

module.exports = { investMarketRouter };
