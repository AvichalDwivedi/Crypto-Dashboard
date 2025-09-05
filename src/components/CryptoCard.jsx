import { Link } from 'react-router-dom';

const CryptoCard = ({ crypto, onAddToPortfolio }) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <Link 
          to={`/crypto/${crypto.id}`}
          className="flex items-center flex-1 cursor-pointer"
        >
          <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="font-semibold text-white hover:text-blue-400">
              {crypto.symbol.toUpperCase()}
            </h3>
            <p className="text-sm text-gray-400">{crypto.name}</p>
          </div>
        </Link>
        <button
          onClick={onAddToPortfolio}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors ml-2"
        >
          Add
        </button>
      </div>
      
      <Link to={`/crypto/${crypto.id}`} className="cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold text-white">
              ${crypto.current_price.toLocaleString()}
            </p>
            <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '↗' : '↘'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Market Cap</p>
            <p className="text-sm font-medium text-white">
              ${crypto.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CryptoCard;