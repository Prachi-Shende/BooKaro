import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Calendar, Clock, Truck, CreditCard, Gift, ChevronRight, Info, AlertCircle } from 'lucide-react';
import './ViewCart.css';
import { db } from '../firebase/db';  // adjust according to your Firebase setup
import { collection, doc, getDoc } from 'firebase/firestore';


const ViewCart = () => {
  const navigate = useNavigate();
  
  // Cart items state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Engineering Mathematics Vol 1",
      author: "H.K. Dass",
      price: 450,
      quantity: 1,
      coverInitials: "EM",
      condition: "Like New"
    },
    {
      id: 3,
      title: "Computer Networks",
      author: "Andrew S. Tanenbaum",
      price: 650,
      quantity: 1,
      coverInitials: "CN",
      condition: "Good"
    }
  ]);
  
  // States for delivery and payment
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('standard');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  
  // Calculate estimated delivery date
  useEffect(() => {
    const today = new Date();
    let daysToAdd = selectedDeliveryOption === 'express' ? 2 : 5;
    
    // Skip weekends for delivery date calculation
    let deliveryDate = new Date(today);
    while (daysToAdd > 0) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      // Skip weekend days (0 = Sunday, 6 = Saturday)
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
        daysToAdd--;
      }
    }
    
    setDeliveryDate(deliveryDate);
  }, [selectedDeliveryOption]);
  
  // Format date to readable string
  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
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
  
  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'BOOKS20') {
      const discount = Math.round(subtotal * 0.2); // 20% discount
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };
  
  // Remove promo code
  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoApplied(false);
  };
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate delivery fee
  const deliveryFee = selectedDeliveryOption === 'express' ? 100 : 50;
  
  // Calculate total
  const total = subtotal + deliveryFee - promoDiscount;
  
  // Handle checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="view-cart-container">
      <div className="view-cart-header">
        <h1 className="view-cart-title">Shopping Cart</h1>
        <div className="view-cart-breadcrumb">
          <span className="current-step">Cart</span>
          <ChevronRight size={16} />
          <span className="step">Checkout</span>
          <ChevronRight size={16} />
          <span className="step">Confirmation</span>
        </div>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart-icon">
            <ShoppingBag size={64} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any books to your cart yet.</p>
          <Link to="/shop" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="view-cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Cart Items ({cartItems.length})</h2>
              <Link to="/shop" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
            
            <ul className="cart-items-list">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item-card">
                  <div className="cart-item-image">
                    <div className="book-cover-placeholder">
                      <span>{item.coverInitials}</span>
                    </div>
                  </div>
                  
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-author">by {item.author}</p>
                    <div className="cart-item-condition">
                      <span className={`condition-badge ${item.condition.toLowerCase().replace(' ', '-')}`}>
                        {item.condition}
                      </span>
                    </div>
                  </div>
                  
                  <div className="cart-item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Qty</label>
                    <div className="quantity-control">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span id={`quantity-${item.id}`} className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="cart-item-price">
                    <span className="item-price">₹{item.price}.00</span>
                    <span className="item-total">₹{item.price * item.quantity}.00</span>
                  </div>
                  
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="delivery-options-section">
              <h3 className="section-title">
                <Truck size={20} />
                Choose Delivery Option
              </h3>
              
              <div className="delivery-options">
                <div 
                  className={`delivery-option ${selectedDeliveryOption === 'standard' ? 'selected' : ''}`}
                  onClick={() => setSelectedDeliveryOption('standard')}
                >
                  <div className="delivery-option-radio">
                    <input 
                      type="radio" 
                      id="standard-delivery" 
                      name="delivery-option" 
                      checked={selectedDeliveryOption === 'standard'}
                      onChange={() => setSelectedDeliveryOption('standard')}
                    />
                    <label htmlFor="standard-delivery">Standard Delivery</label>
                  </div>
                  <div className="delivery-details">
                    <div className="delivery-time">
                      <Calendar size={16} />
                      <span>Delivers by {selectedDeliveryOption === 'standard' ? formatDate(deliveryDate) : ''}</span>
                    </div>
                    <div className="delivery-fee">₹50.00</div>
                  </div>
                </div>
                
                <div 
                  className={`delivery-option ${selectedDeliveryOption === 'express' ? 'selected' : ''}`}
                  onClick={() => setSelectedDeliveryOption('express')}
                >
                  <div className="delivery-option-radio">
                    <input 
                      type="radio" 
                      id="express-delivery" 
                      name="delivery-option" 
                      checked={selectedDeliveryOption === 'express'}
                      onChange={() => setSelectedDeliveryOption('express')}
                    />
                    <label htmlFor="express-delivery">Express Delivery</label>
                  </div>
                  <div className="delivery-details">
                    <div className="delivery-time">
                      <Clock size={16} />
                      <span>Delivers by {selectedDeliveryOption === 'express' ? formatDate(deliveryDate) : ''}</span>
                    </div>
                    <div className="delivery-fee">₹100.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal}.00</span>
                </div>
                
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}.00</span>
                </div>
                
                {promoApplied && (
                  <div className="summary-row discount">
                    <span>Discount (BOOKS20)</span>
                    <span>-₹{promoDiscount}.00</span>
                  </div>
                )}
                
                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{total}.00</span>
                </div>
              </div>
              
              <div className="promo-code-section">
                <h4>Have a promo code?</h4>
                <div className="promo-input-group">
                  <input 
                    type="text" 
                    placeholder="Enter promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  {promoApplied ? (
                    <button 
                      className="remove-promo-btn"
                      onClick={removePromoCode}
                    >
                      Remove
                    </button>
                  ) : (
                    <button 
                      className="apply-promo-btn"
                      onClick={applyPromoCode}
                      disabled={!promoCode}
                    >
                      Apply
                    </button>
                  )}
                </div>
                
                {promoApplied && (
                  <div className="promo-applied-message">
                    <Info size={14} />
                    <span>20% discount applied!</span>
                  </div>
                )}
              </div>
              
              <div className="payment-method-section">
                <h3 className="section-title">
                  <CreditCard size={20} />
                  Payment Method
                </h3>
                
                <div className="payment-methods">
                  <div 
                    className={`payment-method ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => setSelectedPaymentMethod('card')}
                  >
                    <input 
                      type="radio" 
                      id="payment-card" 
                      name="payment-method" 
                      checked={selectedPaymentMethod === 'card'}
                      onChange={() => setSelectedPaymentMethod('card')}
                    />
                    <label htmlFor="payment-card">Credit/Debit Card</label>
                    <div className="payment-icons">
                      <div className="card-icon visa"></div>
                      <div className="card-icon mastercard"></div>
                      <div className="card-icon amex"></div>
                    </div>
                  </div>
                  
                  <div 
                    className={`payment-method ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
                    onClick={() => setSelectedPaymentMethod('upi')}
                  >
                    <input 
                      type="radio" 
                      id="payment-upi" 
                      name="payment-method" 
                      checked={selectedPaymentMethod === 'upi'}
                      onChange={() => setSelectedPaymentMethod('upi')}
                    />
                    <label htmlFor="payment-upi">UPI</label>
                    <div className="payment-icons">
                      <div className="upi-icon gpay"></div>
                      <div className="upi-icon phonepe"></div>
                      <div className="upi-icon paytm"></div>
                    </div>
                  </div>
                  
                  <div 
                    className={`payment-method ${selectedPaymentMethod === 'cod' ? 'selected' : ''}`}
                    onClick={() => setSelectedPaymentMethod('cod')}
                  >
                    <input 
                      type="radio" 
                      id="payment-cod" 
                      name="payment-method" 
                      checked={selectedPaymentMethod === 'cod'}
                      onChange={() => setSelectedPaymentMethod('cod')}
                    />
                    <label htmlFor="payment-cod">Cash on Delivery</label>
                    <div className="payment-note">
                      <AlertCircle size={14} />
                      <span>Additional ₹50 fee applies</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout <ChevronRight size={16} />
              </button>
              
              <div className="cart-summary-footer">
                <div className="secure-checkout">
                  <CreditCard size={14} />
                  <span>Secure Checkout</span>
                </div>
                
                <div className="gift-options">
                  <Gift size={14} />
                  <span>Gift wrapping available at checkout</span>
                </div>
              </div>
            </div>
            
            <div className="recommended-section">
              <h4>Frequently Bought Together</h4>
              <div className="recommended-books">
                <div className="recommended-book">
                  <div className="book-cover-small">
                    <span>DS</span>
                  </div>
                  <div className="recommended-book-details">
                    <p className="book-title">Data Structures</p>
                    <p className="book-price">₹350.00</p>
                    <button className="add-to-cart-small">Add</button>
                  </div>
                </div>
                
                <div className="recommended-book">
                  <div className="book-cover-small">
                    <span>AL</span>
                  </div>
                  <div className="recommended-book-details">
                    <p className="book-title">Algorithms</p>
                    <p className="book-price">₹450.00</p>
                    <button className="add-to-cart-small">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCart;