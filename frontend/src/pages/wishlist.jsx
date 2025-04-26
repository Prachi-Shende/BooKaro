import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Filter, ChevronDown, X, Search } from 'lucide-react';
import './wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filterCategories, setFilterCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Demo data for wishlist items
  const demoWishlistItems = [
    {
      id: 1,
      title: "Engineering Mathematics Vol 1",
      author: "H.K. Dass",
      price: 450,
      category: "Academic",
      coverInitials: "EM",
      dateAdded: new Date('2025-04-15'),
      availability: true
    },
    {
      id: 2,
      title: "Data Structures Using C",
      author: "Reema Thareja",
      price: 380,
      category: "Computer Science",
      coverInitials: "DS",
      dateAdded: new Date('2025-04-10'),
      availability: true
    },
    {
      id: 3,
      title: "Computer Networks",
      author: "Andrew S. Tanenbaum",
      price: 650,
      category: "Computer Science",
      coverInitials: "CN",
      dateAdded: new Date('2025-04-20'),
      availability: false
    },
    {
      id: 4, 
      title: "Digital Logic Design",
      author: "Morris Mano",
      price: 420,
      category: "Electronics",
      coverInitials: "DL",
      dateAdded: new Date('2025-04-05'),
      availability: true
    },
    {
      id: 5,
      title: "Operating System Concepts",
      author: "Silberschatz, Galvin",
      price: 580,
      category: "Computer Science",
      coverInitials: "OS",
      dateAdded: new Date('2025-03-25'),
      availability: true
    },
    {
      id: 6,
      title: "Database Management Systems",
      author: "Raghu Ramakrishnan",
      price: 490,
      category: "Computer Science",
      coverInitials: "DB",
      dateAdded: new Date('2025-04-01'),
      availability: true
    }
  ];

  // Load wishlist items on component mount
  useEffect(() => {
    // Simulating API fetch with a timeout
    const fetchWishlist = () => {
      setTimeout(() => {
        setWishlistItems(demoWishlistItems);
        
        // Extract unique categories for filters
        const categories = [...new Set(demoWishlistItems.map(item => item.category))];
        setFilterCategories(categories);
        
        setLoading(false);
      }, 800);
    };
    
    fetchWishlist();
  }, []);

  // Handle removing item from wishlist
  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  // Handle adding item to cart
  const handleAddToCart = (item) => {
    console.log(`Added to cart: ${item.title}`);
    // Here you would typically dispatch an action to add the item to cart
    // For demo purposes, we'll just show a message
    alert(`${item.title} added to cart!`);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle price range change
  const handlePriceChange = (e, boundary) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange({ ...priceRange, [boundary]: value });
  };

  // Filter and sort wishlist items
  const filteredAndSortedItems = wishlistItems
    .filter(item => {
      // Filter by search term
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by selected categories
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      
      // Filter by price range
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      // Sort based on selected sort option
      switch (sortOption) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'newest':
          return b.dateAdded - a.dateAdded;
        case 'oldest':
          return a.dateAdded - b.dateAdded;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <div className="wishlist-title-container">
          <Heart size={28} className="wishlist-icon" />
          <h1 className="wishlist-title">My Wishlist</h1>
          <span className="wishlist-count">{wishlistItems.length} items</span>
        </div>
        
        <div className="wishlist-actions">
          <button 
            className="filter-button"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} />
            <span>Filter & Sort</span>
            <ChevronDown size={16} className={`filter-chevron ${filterOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="wishlist-search-container">
        <div className="wishlist-search-wrapper">
          <Search size={20} className="wishlist-search-icon" />
          <input
            type="text"
            placeholder="Search in your wishlist..."
            className="wishlist-search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button 
              className="wishlist-search-clear" 
              onClick={() => setSearchTerm('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Filter panel */}
      {filterOpen && (
        <div className="wishlist-filter-panel">
          <div className="filter-section">
            <h3 className="filter-heading">Sort By</h3>
            <div className="sort-options">
              <button 
                className={`sort-option ${sortOption === 'newest' ? 'active' : ''}`}
                onClick={() => setSortOption('newest')}
              >
                Newest First
              </button>
              <button 
                className={`sort-option ${sortOption === 'oldest' ? 'active' : ''}`}
                onClick={() => setSortOption('oldest')}
              >
                Oldest First
              </button>
              <button 
                className={`sort-option ${sortOption === 'priceAsc' ? 'active' : ''}`}
                onClick={() => setSortOption('priceAsc')}
              >
                Price: Low to High
              </button>
              <button 
                className={`sort-option ${sortOption === 'priceDesc' ? 'active' : ''}`}
                onClick={() => setSortOption('priceDesc')}
              >
                Price: High to Low
              </button>
              <button 
                className={`sort-option ${sortOption === 'alphabetical' ? 'active' : ''}`}
                onClick={() => setSortOption('alphabetical')}
              >
                Alphabetical
              </button>
            </div>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-heading">Price Range</h3>
            <div className="price-range-inputs">
              <div className="price-input-group">
                <label>Min:</label>
                <input 
                  type="number" 
                  min="0" 
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange(e, 'min')}
                  className="price-input"
                />
              </div>
              <div className="price-input-group">
                <label>Max:</label>
                <input 
                  type="number" 
                  min="0"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(e, 'max')}
                  className="price-input"
                />
              </div>
            </div>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-heading">Categories</h3>
            <div className="category-options">
              {filterCategories.map((category, index) => (
                <label key={index} className="category-option">
                  <input 
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-buttons">
            <button 
              className="clear-filters-button"
              onClick={() => {
                setSelectedCategories([]);
                setPriceRange({ min: 0, max: 1000 });
                setSortOption('newest');
              }}
            >
              Clear All Filters
            </button>
            <button 
              className="close-filters-button"
              onClick={() => setFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Wishlist content */}
      <div className="wishlist-content">
        {loading ? (
          <div className="wishlist-loading">
            <div className="loader"></div>
            <p>Loading your wishlist...</p>
          </div>
        ) : filteredAndSortedItems.length === 0 ? (
          <div className="wishlist-empty">
            {wishlistItems.length === 0 ? (
              <>
                <div className="empty-wishlist-icon">
                  <Heart size={48} />
                </div>
                <h2>Your wishlist is empty</h2>
                <p>Start adding books you like to your wishlist</p>
                <button 
                  className="browse-books-button"
                  onClick={() => navigate('/')}
                >
                  Browse Books
                </button>
              </>
            ) : (
              <>
                <div className="no-results-icon">
                  <Search size={48} />
                </div>
                <h2>No matching items</h2>
                <p>Try adjusting your search or filter criteria</p>
                <button 
                  className="clear-search-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategories([]);
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                >
                  Clear Search
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="wishlist-grid">
            {filteredAndSortedItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-item-content">
                  <div className="wishlist-item-cover">
                    <div className="book-cover-placeholder">
                      <span>{item.coverInitials}</span>
                    </div>
                    {!item.availability && (
                      <div className="unavailable-badge">Unavailable</div>
                    )}
                  </div>
                  
                  <div className="wishlist-item-details">
                    <Link to={`/book/${item.id}`} className="wishlist-item-title">
                      {item.title}
                    </Link>
                    <p className="wishlist-item-author">by {item.author}</p>
                    <p className="wishlist-item-category">{item.category}</p>
                    <p className="wishlist-item-price">₹{item.price}.00</p>
                    <div className="wishlist-item-actions">
                      <button 
                        className={`add-to-cart-button ${!item.availability ? 'disabled' : ''}`}
                        onClick={() => item.availability && handleAddToCart(item)}
                        disabled={!item.availability}
                      >
                        <ShoppingCart size={16} />
                        <span>Add to Cart</span>
                      </button>
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;