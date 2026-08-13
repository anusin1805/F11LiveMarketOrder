const { Router } = require('express');

const healthRouter = require('./health');
const productsRouter = require('./products');
const collectionsRouter = require('./collections');
const cartRouter = require('./cart');
const ordersRouter = require('./orders');
const journalRouter = require('./journal');
const storefrontRouter = require('./storefront');

// F11 Live Trading & Gamification Modules
const { investMarketRouter } = require('./invest-market');
const { investUsersRouter } = require('./invest-users');
const { investPredictionsRouter } = require('./invest-predictions');
const { investStrategyRouter } = require('./invest-strategy');
const { investWalletRouter } = require('./invest-wallet');
const { investReferralsRouter } = require('./invest-referrals');

const router = Router();

// Store & E-commerce Routes
router.use(healthRouter);
router.use(productsRouter);
router.use(collectionsRouter);
router.use(cartRouter);
router.use(ordersRouter);
router.use(journalRouter);
router.use(storefrontRouter);

// F11 Invest Routes (Ventura Integration)
router.use(investMarketRouter);
router.use(investUsersRouter);
router.use(investPredictionsRouter);
router.use(investStrategyRouter);
router.use(investWalletRouter);
router.use(investReferralsRouter);

module.exports = router;
