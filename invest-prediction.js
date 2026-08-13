const { Router } = require('express');
const { z } = require('zod');

const investPredictionsRouter = Router();

const CallSchema = z.object({
  symbol: z.string(),
  direction: z.enum(['UP', 'DOWN']),
  targetChangePercent: z.number().default(5),
});

// POST /api/invest/predictions/call - Submit Daily Challenge Prediction
investPredictionsRouter.post('/invest/predictions/call', async (req, res) => {
  const parseResult = CallSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ success: false, error: parseResult.error.message });
  }

  const { symbol, direction } = parseResult.data;

  // Record prediction logic (e.g., store in database)
  res.json({
    success: true,
    message: `Prediction recorded: ${symbol} ${direction}`,
    rewardPointsIfCorrect: 50, // F11 Coins
  });
});

// GET /api/invest/predictions/summary - Get User Prediction Progress
investPredictionsRouter.get('/invest/predictions/summary', async (_req, res) => {
  res.json({
    success: true,
    data: {
      totalDailyCallsAllowed: 5,
      callsCompleted: 0,
      activePredictions: [],
    },
  });
});

module.exports = { investPredictionsRouter };
