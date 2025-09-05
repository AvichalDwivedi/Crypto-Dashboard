import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CryptoList from './components/CryptoList';
import Portfolio from './components/Portfolio';
import CryptoDetail from './components/CryptoDetail';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<CryptoList />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/crypto/:id" element={<CryptoDetail />} />
          </Routes>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;



