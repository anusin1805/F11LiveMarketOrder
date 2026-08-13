const axios = require('axios');

class VenturaService {
  constructor() {
    this.appKey = process.env.VENTURA_APP_KEY || '7x931yuMSJ2NrAsIKkdv';
    this.secretKey = process.env.VENTURA_SECRET_KEY || 'OS8ZMX09SJ';

    this.client = axios.create({
      baseURL: 'https://seapi.venturasecurities.com/v1',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Key': this.appKey,
        'X-Secret-Key': this.secretKey,
      },
      timeout: 10000,
    });
  }

  // Fetch real-time market data quotes from Ventura
  async getMarketQuote(symbol) {
    try {
      const response = await this.client.get(`/market/quote?symbol=${symbol}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch quote for ${symbol} from Ventura:`, error);
      throw error;
    }
  }

  // Execute live trading order via Ventura EaseAPI
  async placeOrder(userToken, order) {
    try {
      const response = await this.client.post('/orders/place', order, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return response.data;
    } catch (error) {
      console.error('Ventura order placement failed:', error);
      throw error;
    }
  }

  // Fetch user margin / funds position
  async getFundDetails(userToken) {
    try {
      const response = await this.client.get('/user/funds', {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch funds from Ventura:', error);
      throw error;
    }
  }
}

const venturaService = new VenturaService();

module.exports = {
  VenturaService,
  venturaService,
};
