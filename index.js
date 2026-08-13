const express = require('express');
const cors = require('cors'); // Import cors
const app = express();

// Enable CORS for your GitHub Pages frontend
app.use(cors({
  origin: 'https://anusin1805.github.io'
}));

// Middleware to parse JSON bodies
app.use(express.json());

// F11 Live Trading & Gamification Modules
const { investMarketRouter } = require('./invest-market');
const { investUsersRouter } = require('./invest-users');
const { investPredictionsRouter } = require('./invest-prediction');
const { investStrategyRouter } = require('./invest-strategy');
const { investWalletRouter } = require('./invest-wallet');
const { investReferralsRouter } = require('./invest-referrals');

// F11 Invest Routes (Ventura Integration)
app.use(investMarketRouter);
app.use(investUsersRouter);
app.use(investPredictionsRouter);
app.use(investStrategyRouter);
app.use(investWalletRouter);
app.use(investReferralsRouter);

// Root route for health checks
app.get('/', (req, res) => {
  res.send('F11 Invest Backend is running successfully!');
});

// Start the server (Render automatically assigns a PORT environment variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


