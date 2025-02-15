import React from 'react';
import { Menu, Search, User, ShoppingCart, Shield, Tent } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
  onCartClick: () => void;
}

export default function Navbar({ onMenuClick, onCartClick }: NavbarProps) {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-tactical-green via-olive-800 to-tactical-green shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-6">
            <button
              onClick={onMenuClick}
              className="p-2.5 rounded-lg hover:bg-olive-800/50 transition-colors"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5 text-tactical-sand" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center bg-tactical-sand rounded-lg p-2">
                <Shield className="h-6 w-6 text-tactical-green" />
                <Tent className="h-6 w-6 text-tactical-green -ml-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-tactical-sand">
                  OutdoorGear
                </h1>
                <span className="text-xs text-olive-200 tracking-wider">TACTICAL EQUIPMENT</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="p-2.5 rounded-lg hover:bg-olive-800/50 transition-colors group" 
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-tactical-sand group-hover:text-olive-200 transition-colors" />
            </button>
            <button 
              className="p-2.5 rounded-lg hover:bg-olive-800/50 transition-colors group" 
              aria-label="Account"
            >
              <User className="h-5 w-5 text-tactical-sand group-hover:text-olive-200 transition-colors" />
            </button>
            <button 
              className="p-2.5 rounded-lg hover:bg-olive-800/50 transition-colors relative group" 
              aria-label="Cart"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5 text-tactical-sand group-hover:text-olive-200 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-tactical-brown text-tactical-sand text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-tactical-sand">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}