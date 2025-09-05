import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);

  // Load portfolio from localStorage on initial render
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('cryptoPortfolio');
    if (savedPortfolio) {
      try {
        setPortfolio(JSON.parse(savedPortfolio));
      } catch (error) {
        console.error('Error parsing portfolio from localStorage:', error);
        setPortfolio([]);
      }
    }
  }, []);

  // Save portfolio to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (crypto) => {
    setPortfolio(prevPortfolio => {
      const existingItem = prevPortfolio.find(item => item.id === crypto.id);
      
      if (existingItem) {
        // If already in portfolio, increase quantity by 1
        return prevPortfolio.map(item => 
          item.id === crypto.id 
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                current_price: crypto.current_price, // Update price to latest
                last_updated: new Date().toISOString()
              } 
            : item
        );
      } else {
        // If not in portfolio, add with quantity 1
        return [...prevPortfolio, { 
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name,
          image: crypto.image,
          current_price: crypto.current_price,
          quantity: 1,
          addedAt: new Date().toISOString(),
          last_updated: new Date().toISOString()
        }];
      }
    });
  };

  const removeFromPortfolio = (id) => {
    setPortfolio(prevPortfolio => prevPortfolio.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    const quantity = parseFloat(newQuantity);
    if (!isNaN(quantity) && quantity >= 0) {
      setPortfolio(prevPortfolio => 
        prevPortfolio.map(item => 
          item.id === id 
            ? { 
                ...item, 
                quantity: quantity,
                last_updated: new Date().toISOString()
              } 
            : item
        )
      );
    }
  };

  const clearPortfolio = () => {
    setPortfolio([]);
  };

  const value = {
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    updateQuantity,
    clearPortfolio
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};