import { usePortfolio } from '../context/PortfolioContext';

const Portfolio = () => {
  const { portfolio, removeFromPortfolio, updateQuantity } = usePortfolio();

  const totalValue = portfolio.reduce((total, item) => {
    return total + (item.current_price * item.quantity);
  }, 0);

  if (portfolio.length === 0) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-4">Your Portfolio</h2>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-700">
          <p className="text-gray-400">Your portfolio is empty. Add some cryptocurrencies to track.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-4">Your Portfolio</h2>
      
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">Portfolio Summary</h3>
        <p className="text-2xl font-bold text-blue-400">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p className="text-sm text-gray-400">Total Value</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="py-3 px-4 text-left">Coin</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right">Holdings</th>
              <th className="py-3 px-4 text-right">Value</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map(item => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <p className="font-medium text-white">{item.symbol.toUpperCase()}</p>
                      <p className="text-sm text-gray-400">{item.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-white">
                  ${item.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                </td>
                <td className="py-3 px-4 text-right">
                  <input
                    type="number"
                    min="0"
                    step="0.001"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="w-24 p-1 bg-gray-700 text-white rounded border border-gray-600 text-right"
                  />
                </td>
                <td className="py-3 px-4 text-right text-white">
                  ${(item.current_price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => removeFromPortfolio(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;


