
// F11 Live Trading & Gamification Modules
const { investMarketRouter } = require('./invest-market');
const { investUsersRouter } = require('./invest-users');
const { investPredictionsRouter } = require('./invest-predictions');
const { investStrategyRouter } = require('./invest-strategy');
const { investWalletRouter } = require('./invest-wallet');
const { investReferralsRouter } = require('./invest-referrals');

const router = Router()

// F11 Invest Routes (Ventura Integration)
router.use(investMarketRouter);
router.use(investUsersRouter);
router.use(investPredictionsRouter);
router.use(investStrategyRouter);
router.use(investWalletRouter);
router.use(investReferralsRouter);

module.exports = router;
