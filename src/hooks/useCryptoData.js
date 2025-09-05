import { useState, useEffect } from 'react';
import axios from 'axios';

const CACHE_DURATION = 60000; // 1 minute

const useCryptoData = (endpoint, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.coingecko.com/api/v3/${endpoint}`, {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
            ...params
          },
          headers: {
            'Accept': 'application/json',
          }
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up auto-refresh
    const interval = setInterval(fetchData, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useCryptoData;