import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center mb-4 md:mb-0">
          <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Crypto Dashboard</h1>
        </Link>
        
        {/* Centered Navigation */}
        <nav className="flex space-x-1 bg-gray-700 p-1 rounded-xl">
          <Link 
            to="/" 
            className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
              location.pathname === '/' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/market" 
            className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
              location.pathname === '/market' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Market
          </Link>
          <Link 
            to="/portfolio" 
            className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
              location.pathname === '/portfolio' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Portfolio
          </Link>
        </nav>
        
        <div className="hidden md:block">
          {/* Placeholder for future user actions */}
        </div>
      </div>
    </header>
  );
};

export default Header;