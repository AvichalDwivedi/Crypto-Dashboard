import { useState } from 'react';
import useCryptoData from '../hooks/useCryptoData';
import CryptoCard from './CryptoCard';
import { usePortfolio } from '../context/PortfolioContext';

const CryptoList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { data: cryptocurrencies, loading, error } = useCryptoData('coins/markets');
  const { addToPortfolio } = usePortfolio();

  const filteredCryptos = cryptocurrencies.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToPortfolio = (crypto) => {
    addToPortfolio(crypto);
    
    // Show success message
    setAlertMessage(`${crypto.name} added to your portfolio!`);
    setShowAlert(true);
    
    // Auto hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen">
        <div className="loading-spinner"></div>
        <p className="text-center text-gray-400 mt-2">Loading cryptocurrency data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-gray-900 min-h-screen">
        <p className="text-red-400">Error loading data: {error}</p>
        <p className="text-gray-400 mt-2">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Success Alert */}
      {showAlert && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn">
          {alertMessage}
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Cryptocurrency Market</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCryptos.map(crypto => (
          <CryptoCard 
            key={crypto.id} 
            crypto={crypto} 
            onAddToPortfolio={() => handleAddToPortfolio(crypto)}
          />
        ))}
      </div>
    </div>
  );
};

export default CryptoList;