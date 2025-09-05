import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredCryptos, setFeaturedCryptos] = useState([]);
  const [marketStats, setMarketStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        const [featuredResponse, globalResponse] = await Promise.all([
          axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&price_change_percentage=24h'),
          axios.get('https://api.coingecko.com/api/v3/global')
        ]);

        setFeaturedCryptos(featuredResponse.data);
        setMarketStats(globalResponse.data.data);
        
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
    
    const interval = setInterval(fetchHomeData, 120000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="loading-spinner mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading market data...</p>
        </div>
      </div>
    );
  }

  // Crypto Benefits and Safety Features Data
  const cryptoFeatures = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Secure Transactions",
      description: "Advanced encryption and security protocols to keep your transactions and data safe from threats."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Real-time data updates and instant portfolio tracking without any delays or lag."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Privacy Focused",
      description: "We prioritize your privacy with anonymous tracking and no unnecessary data collection."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "24/7 Monitoring",
      description: "Round-the-clock market monitoring and alerts to keep you informed of important changes."
    }
  ];

  // Market trend indicators
  const marketTrend = marketStats.market_cap_change_percentage_24h_usd;
  const trendText = marketTrend >= 0 ? "up" : "down";
  const trendColor = marketTrend >= 0 ? "text-green-400" : "text-red-400";
  const trendIcon = marketTrend >= 0 ? "↗" : "↘";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section - Updated */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Track Crypto Markets in Real-Time
            </h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Monitor cryptocurrency prices, manage your portfolio, and discover market insights with our powerful dashboard.
            </p>
            
            {/* Market Status Indicator */}
            <div className="inline-flex items-center bg-gray-800 bg-opacity-50 rounded-full px-6 py-3 mb-8 border border-gray-700">
              <span className="text-gray-400 mr-2">Market is</span>
              <span className={`font-semibold ${trendColor}`}>
                {trendIcon} {Math.abs(marketTrend || 0).toFixed(2)}% {trendText}
              </span>
              <span className="text-gray-400 ml-2">in 24h</span>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">
                  ${marketStats.total_market_cap?.usd ? (marketStats.total_market_cap.usd / 1e12).toFixed(1) + 'T' : 'N/A'}
                </div>
                <div className="text-sm text-gray-400">Market Cap</div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">
                  ${marketStats.total_volume?.usd ? (marketStats.total_volume.usd / 1e9).toFixed(1) + 'B' : 'N/A'}
                </div>
                <div className="text-sm text-gray-400">Volume (24h)</div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">
                  {marketStats.active_cryptocurrencies || 'N/A'}
                </div>
                <div className="text-sm text-gray-400">Active Cryptos</div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">
                  {marketStats.markets || 'N/A'}
                </div>
                <div className="text-sm text-gray-400">Markets</div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Benefits & Safety Section */}
      <section className="py-12 md:py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Crypto Benefits & Safety</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {cryptoFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-700 p-6 rounded-2xl shadow-lg border border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 group"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-gray-600 p-3 rounded-lg group-hover:bg-blue-900 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white ml-4 group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
                <div className="mt-4 h-1 bg-gradient-to-r from-gray-600 to-gray-600 rounded-full group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Featured Cryptocurrencies */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 md:mb-0">Trending Cryptocurrencies</h3>
              <Link to="/market" className="flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCryptos.map((crypto, index) => (
                <div 
                  key={crypto.id} 
                  className="bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img src={crypto.image} alt={crypto.name} className="w-12 h-12 mr-4 rounded-full" />
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{crypto.name}</h4>
                      <p className="text-gray-400">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-xl font-semibold text-white">${crypto.current_price.toLocaleString()}</p>
                      <p className={crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {crypto.price_change_percentage_24h >= 0 ? '↗' : '↘'} 
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Market Cap</p>
                      <p className="font-medium text-white">${(crypto.market_cap / 1e9).toFixed(2)}B</p>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/crypto/${crypto.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-white mb-12">Why Choose Crypto Dashboard?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
                <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-3 text-white">Real-time Data</h4>
                <p className="text-gray-400">Get live prices and market data updated every minute from reliable sources.</p>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
                <div className="w-20 h-20 bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-3 text-white">Portfolio Tracking</h4>
                <p className="text-gray-400">Track your investments and monitor performance with intuitive tools.</p>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
                <div className="w-20 h-20 bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-3 text-white">Advanced Charts</h4>
                <p className="text-gray-400">Interactive charts with multiple timeframes and technical indicators.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-800 to-purple-800">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Start Your Crypto Journey</h3>
          <p className="mb-8 max-w-2xl mx-auto text-lg text-blue-100">
            Join thousands of investors who use Crypto Dashboard to monitor their cryptocurrency investments and make informed decisions.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/market" 
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Market
            </Link>
            <Link 
              to="/portfolio" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;