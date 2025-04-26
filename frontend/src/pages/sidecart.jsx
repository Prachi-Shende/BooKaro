import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, ShoppingBag, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './SideCart.css';

const SideCart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Engineering Mathematics Vol 1",
      author: "H.K. Dass",
      price: 450,
      quantity: 1,
      coverInitials: "EM"
    },
    {
      id: 3,
      title: "Computer Networks",
      author: "Andrew S. Tanenbaum",
      price: 650,
      quantity: 1,
      coverInitials: "CN"
    }
  ]);
  
  const cartRef = useRef(null);
  
  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };
  
  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Handle view cart click
  const handleViewCart = () => {
    navigate('/view-cart');
    onClose();
  };
  
  return (
    <div className={`side-cart-overlay ${isOpen ? 'active' : ''}`}>
      <div 
        ref={cartRef}
        className={`side-cart ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="side-cart-header">
          <h2 className="side-cart-title">
            <ShoppingBag size={20} />
            Your Cart
            <span className="side-cart-count">{cartItems.length}</span>
          </h2>
          <button 
            className="side-cart-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="side-cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <ShoppingBag size={48} />
              </div>
              <p className="empty-cart-message">Your cart is empty</p>
              <Link to="/shop" className="browse-books-btn" onClick={onClose}>
                Browse Books
              </Link>
            </div>
          ) : (
            <>
              <ul className="cart-items-list">
                {cartItems.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <div className="book-cover-placeholder">
                        <span>{item.coverInitials}</span>
                      </div>
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.title}</h3>
                      <p className="cart-item-author">by {item.author}</p>
                      <p className="cart-item-price">₹{item.price}.00</p>
                      
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          className="remove-item-btn"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="cart-summary">
                <div className="cart-totals">
                  <div className="cart-total-row">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}.00</span>
                  </div>
                  <div className="cart-total-row">
                    <span>Delivery</span>
                    <span>₹50.00</span>
                  </div>
                  <div className="cart-total-row cart-total-final">
                    <span>Total</span>
                    <span>₹{totalPrice + 50}.00</span>
                  </div>
                </div>
                
                <div className="cart-buttons">
                  <button className="view-cart-btn" onClick={handleViewCart}>
                    View Cart
                  </button>
                  <Link to="/checkout" className="checkout-btn" onClick={onClose}>
                    Checkout <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideCart;