const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const investRouter = require('./routes/index');

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigin = process.env.DASHBOARD_ORIGIN || 'https://anusin1805.github.io';
app.use(cors({ origin: allowedOrigin }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(investRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`F11 Invest backend listening on port ${PORT}`);
});
