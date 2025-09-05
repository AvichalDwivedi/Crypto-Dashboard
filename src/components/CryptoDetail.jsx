import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoDetail = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('7');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch crypto details
        const [detailResponse, chartResponse] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeRange}`)
        ]);
        
        setCrypto(detailResponse.data);
        
        // Prepare chart data
        const chartData = {
          labels: chartResponse.data.prices.map(price => {
            const date = new Date(price[0]);
            return timeRange === '1' 
              ? date.toLocaleTimeString() 
              : date.toLocaleDateString();
          }),
          datasets: [
            {
              label: 'Price (USD)',
              data: chartResponse.data.prices.map(price => price[1]),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
              fill: true,
            },
          ],
        };
        
        setChartData(chartData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, timeRange]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="loading-spinner"></div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">Loading cryptocurrency data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error loading data: {error}</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">← Back to Market</Link>
      </div>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${crypto.name} Price Chart`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="p-6">
      <Link to="/" className="inline-flex items-center text-blue-500 hover:underline mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Market
      </Link>

      <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
        <div className="flex items-center">
          <img src={crypto.image.large} alt={crypto.name} className="w-16 h-16 mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{crypto.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-xl">{crypto.symbol.toUpperCase()}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setTimeRange('1')} 
            className={`px-3 py-1 rounded-lg ${timeRange === '1' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
          >
            24H
          </button>
          <button 
            onClick={() => setTimeRange('7')} 
            className={`px-3 py-1 rounded-lg ${timeRange === '7' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
          >
            7D
          </button>
          <button 
            onClick={() => setTimeRange('30')} 
            className={`px-3 py-1 rounded-lg ${timeRange === '30' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
          >
            30D
          </button>
          <button 
            onClick={() => setTimeRange('365')} 
            className={`px-3 py-1 rounded-lg ${timeRange === '365' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
          >
            1Y
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400">Current Price</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            ${crypto.market_data.current_price.usd.toLocaleString()}
          </p>
          <p className={crypto.market_data.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
            {crypto.market_data.price_change_percentage_24h >= 0 ? '↑' : '↓'} 
            {Math.abs(crypto.market_data.price_change_percentage_24h).toFixed(2)}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400">Market Cap</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            ${crypto.market_data.market_cap.usd.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Rank #{crypto.market_cap_rank}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400">24H Trading Volume</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            ${crypto.market_data.total_volume.usd.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Price Chart</h2>
        {chartData && <Line options={options} data={chartData} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About {crypto.name}</h2>
          <p className="text-gray-600 dark:text-gray-400" 
            dangerouslySetInnerHTML={{ __html: crypto.description.en.split('. ')[0] + '.' }} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Key Metrics</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">24H High</span>
              <span className="font-medium text-gray-800 dark:text-white">
                ${crypto.market_data.high_24h.usd.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">24H Low</span>
              <span className="font-medium text-gray-800 dark:text-white">
                ${crypto.market_data.low_24h.usd.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Circulating Supply</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {crypto.market_data.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;