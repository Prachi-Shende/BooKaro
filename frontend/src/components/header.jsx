import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, MessageSquare, Menu, X, ChevronDown, Book, HelpCircle, Info, Phone } from 'lucide-react';
import SideCart from '../pages/sidecart';
import LoginSignupPopup from '../pages/loginsignup'; // Import the LoginSignupPopup component
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sideCartOpen, setSideCartOpen] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false); // State for login popup
  
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMobileSearchOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setCategoriesDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setMobileSearchOpen(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  // Toggle side cart
  const toggleSideCart = () => {
    setSideCartOpen(!sideCartOpen);
  };

  // Toggle login popup
  const toggleLoginPopup = () => {
    setLoginPopupOpen(!loginPopupOpen);
    setAccountDropdownOpen(false); // Close account dropdown when opening login popup
  };

  // Close login popup
  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  return (
    <>
      <div className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
        {/* Main Navigation Bar */}
        <nav className="main-nav">
          <div className="container nav-container">
            {/* Logo */}
            <Link to="/" className="logo">
              <div className="logo-icon">
                <Book size={30} />
              </div>
              <span className="logo-text">BooKaro</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="desktop-nav">
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Home
              </NavLink>
              
              {/* Categories Dropdown */}
              <div className="dropdown-wrapper" ref={categoriesDropdownRef}>
              <NavLink to="https://vjti.ac.in/computer-it/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Curriculum 
              </NavLink>
                
                {/* {categoriesDropdownOpen && (
                  <div className="dropdown-menu">
                    <NavLink to="/categories/fiction" className="dropdown-item">Fiction</NavLink>
                    <NavLink to="/categories/non-fiction" className="dropdown-item">Non-Fiction</NavLink>
                    <NavLink to="/categories/academic" className="dropdown-item">Academic</NavLink>
                    <NavLink to="/categories/childrens" className="dropdown-item">Children's</NavLink>
                    <NavLink to="/categories" className="dropdown-item view-all">View All</NavLink>
                  </div>
                )} */}
              </div>
              
              <NavLink to="/sell" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Sell Books
              </NavLink>
              
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                About Us
              </NavLink>
              
              <NavLink to="/resources" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Resources
              </NavLink>
              
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Contact Us
              </NavLink>
            </div>
            
            {/* Search Bar (Desktop) */}
            <form className="search-bar" onSubmit={handleSearchSubmit}>
              <div className="search-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search for books..." 
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  aria-label="Search for books"
                />
                <button type="submit" className="search-button" aria-label="Submit search">
                  <Search size={18} />
                </button>
              </div>
            </form>
            
            {/* Right Icons */}
            <div className="nav-actions">
              {/* Mobile Search Toggle */}
              <button 
                className="icon-button mobile-search-toggle"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                ref={searchRef}
                aria-label="Toggle search"
              >
                <Search size={30} />
              </button>
              
              {/* Account Dropdown - Modified to include login popup toggle */}
              <div className="dropdown-wrapper account-dropdown" ref={accountDropdownRef}>
                <button 
                  className="icon-button"
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  aria-label="Account menu"
                >
                  <User size={30} />
                </button>
                
                {accountDropdownOpen && (
                  <div className="dropdown-menu account-menu">
                    <button onClick={toggleLoginPopup} className="dropdown-item">Login / Sign Up</button>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/profile" className="dropdown-item">My Profile</NavLink>
                    <NavLink to="/view-cart" className="dropdown-item">My Orders</NavLink>
                    <NavLink to="/wishlist" className="dropdown-item">Wishlist</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/logout" className="dropdown-item">Logout</NavLink>
                  </div>
                )}
              </div>
              
              {/* Cart Icon - Modified to toggle side cart */}
              <button 
                className="icon-button cart-button"
                onClick={toggleSideCart}
                aria-label="Open cart"
              >
                <ShoppingCart size={30} />
                <span className="badge">2</span>
              </button>
              
              {/* Messages Icon */}
              <NavLink to="/messages" className="icon-button message-button">
                <MessageSquare size={30} />
                <span className="badge">3</span>
              </NavLink>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="icon-button mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                ref={menuRef}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Search */}
        {mobileSearchOpen && (
          <div className="mobile-search" ref={searchRef}>
            <div className="container">
              <form className="mobile-search-wrapper" onSubmit={handleSearchSubmit}>
                <input 
                  type="text" 
                  placeholder="Search for books..." 
                  className="mobile-search-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  aria-label="Search for books"
                />
                <button type="submit" className="mobile-search-button" aria-label="Submit search">
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu" ref={menuRef}>
            <div className="container">
              <div className="mobile-menu-content">
                <NavLink to="/" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </NavLink>
                
                <div className="mobile-menu-section">
                  {/* <h3 className="mobile-menu-heading">Categories</h3>
                  <NavLink to="/categories/fiction" className="mobile-menu-item sub-item" onClick={() => setMobileMenuOpen(false)}>
                    Fiction
                  </NavLink>
                  <NavLink to="/categories/non-fiction" className="mobile-menu-item sub-item" onClick={() => setMobileMenuOpen(false)}>
                    Non-Fiction
                  </NavLink>
                  <NavLink to="/categories/academic" className="mobile-menu-item sub-item" onClick={() => setMobileMenuOpen(false)}>
                    Academic
                  </NavLink>
                  <NavLink to="/categories/childrens" className="mobile-menu-item sub-item" onClick={() => setMobileMenuOpen(false)}>
                    Children's
                  </NavLink>
                  <NavLink to="/categories" className="mobile-menu-item sub-item view-all" onClick={() => setMobileMenuOpen(false)}>
                    View All Categories
                  </NavLink> */}

                </div>
                
                <NavLink to="/sell" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  Sell Books
                </NavLink>
                
                <NavLink to="/about" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  <Info size={16} className="mobile-menu-icon" />
                  About Us
                </NavLink>
                
                <NavLink to="/resources" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  <HelpCircle size={16} className="mobile-menu-icon" />
                  Resources
                </NavLink>
                
                <NavLink to="/contact" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  <Phone size={16} className="mobile-menu-icon" />
                  Contact Us
                </NavLink>
                
                <div className="mobile-menu-divider"></div>
                
                {/* Add login/signup option to mobile menu */}
                <button 
                  className="mobile-menu-item"
                  onClick={() => {
                    toggleLoginPopup();
                    setMobileMenuOpen(false);
                  }}
                >
                  <User size={16} className="mobile-menu-icon" />
                  Login / Sign Up
                </button>
                
                <NavLink to="/profile" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  <User size={16} className="mobile-menu-icon" />
                  My Account
                </NavLink>
                
                <NavLink to="/messages" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  <MessageSquare size={16} className="mobile-menu-icon" />
                  Messages
                  <span className="mobile-badge">3</span>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Side Cart Component */}
      <SideCart isOpen={sideCartOpen} onClose={() => setSideCartOpen(false)} />
      
      {/* Login/Signup Popup Component */}
      {loginPopupOpen && <LoginSignupPopup isOpen={loginPopupOpen} onClose={closeLoginPopup} />}
    </>
  );
};

export default Header;