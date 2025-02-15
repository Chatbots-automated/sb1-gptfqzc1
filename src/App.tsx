import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-olive-50 bg-camo-pattern">
          <Navbar 
            onMenuClick={() => setIsSidebarOpen(true)} 
            onCartClick={() => setIsCartOpen(true)}
          />
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          
          <Routes>
            <Route path="/" element={
              <main className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 mb-8">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-tactical-sand/20">
                    <h2 className="text-2xl font-bold mb-2 text-tactical-dark">Featured Products</h2>
                    <p className="text-tactical-brown">Discover our selection of high-quality tactical gear and equipment</p>
                  </div>
                </div>
                <ProductGrid />
              </main>
            } />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;