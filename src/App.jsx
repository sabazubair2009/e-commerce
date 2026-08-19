import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import UserPortal from './components/UserPortal';
import CartPage from './components/CartPage';
import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentView('home');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        cartCount={cartCount} 
        user={user} 
        onLogout={handleLogout} 
      />

      <main className="main-content">
        {currentView === 'home' && <HomePage onAddToCart={handleAddToCart} />}
        {currentView === 'userPortal' && (
          <UserPortal user={user} onAuthSuccess={(usr) => setUser(usr)} />
        )}
        {currentView === 'cart' && (
          <CartPage 
            cart={cart} 
            updateQuantity={updateQuantity} 
            clearCart={() => setCart([])} 
            user={user} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}