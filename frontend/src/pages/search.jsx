import React, { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import { 
  FaSearch, FaBook, FaUser, FaBuilding, FaStar, 
  FaFilter, FaTimes, FaShoppingCart, FaDownload, 
  FaInfoCircle, FaArrowRight, FaArrowLeft, FaSpinner
} from "react-icons/fa";
import './search.css';
import Header from '../components/header';
import Footer from '../components/footer';

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    language: "all",
    condition: "all",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minRating: "0",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20;
  const [expandedBook, setExpandedBook] = useState(null);
  const [showAllListings, setShowAllListings] = useState({});

  // Memoized function to fetch and parse CSV data
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/Engineering_books_data_updated.csv");
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const enrichedBooks = result.data.map((book) => {
            const price = book.Price ? parseInt(book.Price) : Math.floor(Math.random() * 1000) + 200;
            return {
              ...book,
              id: Math.random().toString(36).substr(2, 9), // Unique ID for each book
              listings_count: Math.floor(Math.random() * 10) + 1,
              rating: (Math.random() * 2 + 3).toFixed(1),
              price: price,
              image: book.image || `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
              sellers: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
                id: Math.random().toString(36).substr(2, 9),
                name: `Seller ${Math.floor(Math.random() * 1000)}`,
                rating: (Math.random() * 1 + 4).toFixed(1),
                condition: ["New", "Like New", "Very Good", "Good", "Acceptable"][Math.floor(Math.random() * 5)],
                price: Math.round(price * (0.7 + Math.random() * 0.6)),
                freeShipping: Math.random() > 0.5,
              })),
            };
          });
          setBooks(enrichedBooks);
          setLoading(false);
        },
        error: (error) => {
          throw new Error("Error parsing CSV data: " + error.message);
        },
      });
    } catch (err) {
      setError("Error loading book data: " + err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Search handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm.trim());
    setCurrentPage(1);
  };

  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1);
    setShowFilters(false);
  };

  // Extract available options for filters
  const languages = [...new Set(books.map(book => book.language).filter(Boolean))];
  const conditions = [...new Set(books.map(book => book.Condition).filter(Boolean))];
  const years = books.map(book => parseInt(book.year)).filter(year => !isNaN(year));
  const minYearAvailable = years.length > 0 ? Math.min(...years) : 1900;
  const maxYearAvailable = years.length > 0 ? Math.max(...years) : new Date().getFullYear();
  const prices = books.map(book => parseInt(book.price)).filter(price => !isNaN(price));
  const minPriceAvailable = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPriceAvailable = prices.length > 0 ? Math.max(...prices) : 5000;

  // Filter books with memoization
  const filteredBooks = useCallback(() => {
    return books.filter((book) => {
      const search = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        (book.title && book.title.toLowerCase().includes(search)) ||
        (book.author && book.author.toLowerCase().includes(search)) ||
        (book.publisher && book.publisher.toLowerCase().includes(search));
      
      const matchesLanguage = filters.language === "all" || book.language === filters.language;
      const matchesCondition = filters.condition === "all" || book.Condition === filters.condition;
      
      const bookPrice = book.price || 0;
      const matchesMinPrice = filters.minPrice === "" || (bookPrice >= parseInt(filters.minPrice));
      const matchesMaxPrice = filters.maxPrice === "" || (bookPrice <= parseInt(filters.maxPrice));
      
      const bookYear = book.year ? parseInt(book.year) : 0;
      const matchesMinYear = filters.minYear === "" || (bookYear >= parseInt(filters.minYear));
      const matchesMaxYear = filters.maxYear === "" || (bookYear <= parseInt(filters.maxYear));
      
      const bookRating = parseFloat(book.rating) || 0;
      const matchesRating = bookRating >= parseFloat(filters.minRating);
      
      return matchesSearch && matchesLanguage && matchesCondition && 
             matchesMinPrice && matchesMaxPrice && matchesMinYear && matchesMaxYear && matchesRating;
    });
  }, [books, searchQuery, filters]);

  // Sort filtered books
  const sortedBooks = useCallback(() => {
    const filtered = filteredBooks();
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "year-new":
          return (parseInt(b.year) || 0) - (parseInt(a.year) || 0);
        case "year-old":
          return (parseInt(a.year) || 0) - (parseInt(b.year) || 0);
        case "rating":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "listings":
          return b.listings_count - a.listings_count;
        default:
          // Relevance - prioritize search term matches in title first
          if (searchQuery) {
            const aTitleMatch = a.title && a.title.toLowerCase().includes(searchQuery.toLowerCase());
            const bTitleMatch = b.title && b.title.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
          }
          return 0;
      }
    });
  }, [filteredBooks, sortBy, searchQuery]);

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks().slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedBooks().length / booksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      language: "all",
      condition: "all",
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
      minRating: "0",
    });
    setSearchTerm("");
    setSearchQuery("");
    setCurrentPage(1);
    setShowFilters(false);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  // Render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star-fill" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <FaStar className="text-gray-300" />
          <span className="absolute top-0 left-0 overflow-hidden w-1/2">
            <FaStar className="star-fill" />
          </span>
        </span>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return (
      <div className="star-rating">
        {stars}
        <span className="rating-value">({rating})</span>
      </div>
    );
  };

  // Toggle book details expansion
  const toggleExpandBook = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  // Toggle show all listings for a book
  const toggleShowAllListings = (bookId) => {
    setShowAllListings(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  return (
    <div className="search-page">
      <div className="container">
        <Header />
        
        {/* Search Bar */}
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-bar">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, author, or publisher..."
                className="block w-full pl-10 pr-3 py-3"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
          </form>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="search-filters">
            <div className="search-filters-header">
              <h3 className="search-filters-title">Filter Books</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="filters-section">
              {/* Language Filter */}
              <div className="filter-dropdown">
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => setFilters({...filters, language: e.target.value})}
                >
                  <option value="all">All Languages</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              {/* Condition Filter */}
              <div className="filter-dropdown">
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters({...filters, condition: e.target.value})}
                >
                  <option value="all">All Conditions</option>
                  {conditions.map((cond) => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div className="filter-dropdown">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    min={minPriceAvailable}
                    max={maxPriceAvailable}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    min={minPriceAvailable}
                    max={maxPriceAvailable}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Range: ₹{minPriceAvailable} - ₹{maxPriceAvailable}
                </div>
              </div>
              
              {/* Year Range */}
              <div className="filter-dropdown">
                <label className="block text-sm font-medium text-gray-700 mb-1">Publication Year</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minYear}
                    onChange={(e) => setFilters({...filters, minYear: e.target.value})}
                    min={minYearAvailable}
                    max={maxYearAvailable}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxYear}
                    onChange={(e) => setFilters({...filters, maxYear: e.target.value})}
                    min={minYearAvailable}
                    max={maxYearAvailable}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Range: {minYearAvailable} - {maxYearAvailable}
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="filter-dropdown">
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({...filters, minRating: e.target.value})}
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
              
              {/* Sort By */}
              <div className="filter-dropdown">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="year-new">Year: Newest First</option>
                  <option value="year-old">Year: Oldest First</option>
                  <option value="rating">Highest Rating</option>
                  <option value="listings">Most Listings</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={resetFilters}
                className="btn"
              >
                Reset All
              </button>
              <button
                onClick={applyFilters}
                className="btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <FaSpinner className="loading-spinner text-4xl text-blue-500 mb-4" />
            <p className="text-gray-600 text-lg">Loading books...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4 max-w-lg">
              <p>{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* No Results */}
        {!loading && !error && sortedBooks().length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <FaBook className="text-5xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No matching books found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={resetFilters}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Results Count */}
        {!loading && !error && sortedBooks().length > 0 && (
          <div className="search-summary">
            <p>
              Showing {indexOfFirstBook + 1} to {Math.min(indexOfLastBook, sortedBooks().length)} of {sortedBooks().length} books
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-dropdown"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="year-old">Year: Oldest First</option>
                <option value="rating">Highest Rating</option>
                <option value="listings">Most Listings</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Books Grid */}
        {!loading && !error && currentBooks.length > 0 && (
          <div className="books-grid">
            {currentBooks.map((book) => (
              <div 
                key={book.id} 
                className={`book-card ${expandedBook === book.id ? 'expanded' : ''}`}
              >
                {/* Book Header */}
                <div className="book-header">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-blue-600">
                      {book.listings_count} {book.listings_count === 1 ? 'Listing' : 'Listings'}
                    </span>
                  </div>
                  <div className="book-rating">
                    {renderStars(parseFloat(book.rating))}
                  </div>
                </div>
                
                {/* Book Content */}
                <div className="book-info">
                  {/* Book Image */}
                  <div className="book-image">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/200x300?text=No+Image";
                      }}
                    />
                  </div>
                  
                  {/* Book Details */}
                  <h2 
                    className="book-title"
                    onClick={() => toggleExpandBook(book.id)}
                  >
                    {book.title}
                  </h2>
                  
                  {expandedBook === book.id && (
                    <div className="book-details animate-fadeIn">
                      <div className="book-author">
                        <FaUser className="text-gray-400 mr-2" />
                        {book.author || "Unknown author"}
                      </div>
                      
                      <div className="book-publisher">
                        <FaBuilding className="text-gray-400 mr-2" />
                        {book.publisher || "Unknown publisher"}
                      </div>
                      
                      <div className="book-meta">
                        <div className="book-meta-item">
                          <span className="text-gray-500">Year:</span>
                          <span className="font-medium">{book.year || "N/A"}</span>
                        </div>
                        
                        <div className="book-meta-item">
                          <span className="text-gray-500">Pages:</span>
                          <span className="font-medium">{book.pages || "N/A"}</span>
                        </div>
                        
                        <div className="book-meta-item">
                          <span className="text-gray-500">Language:</span>
                          <span className="font-medium">{book.language || "N/A"}</span>
                        </div>
                        
                        <div className="book-meta-item">
                          <span className="text-gray-500">Condition:</span>
                          <span className="font-medium">{book.Condition || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Price Section */}
                  <div className="book-price-section">
                    <div className="flex items-center justify-between">
                      <span className="book-price">
                        {book.price ? `₹${book.price}` : "Price not available"}
                      </span>
                      
                      {book.Used_Price && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Used from ₹{book.Used_Price}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Seller Listings */}
                  <div className="seller-listings">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <FaShoppingCart className="text-gray-500 mr-2" />
                      Available Listings
                    </h3>
                    
                    <div className="space-y-3">
                      {book.sellers && book.sellers
                        .slice(0, showAllListings[book.id] ? book.sellers.length : 2)
                        .map((seller) => (
                          <div key={seller.id} className="seller-listing">
                            <div className="flex justify-between mb-1">
                              <span className="seller-name">{seller.name}</span>
                              <div className="seller-rating">
                                <FaStar className="star-fill mr-1" />
                                {seller.rating}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <span className={`condition-badge ${
                                  seller.condition === "New" ? "condition-good" : 
                                  seller.condition === "Acceptable" ? "condition-acceptable" : ""
                                }`}>
                                  {seller.condition}
                                </span>
                                <span className="seller-price">₹{seller.price}</span>
                              </div>
                              <button className="seller-buy">
                                Buy
                              </button>
                            </div>
                            {seller.freeShipping && (
                              <p className="text-xs text-green-600 mt-1">✓ Free shipping</p>
                            )}
                          </div>
                        ))}
                      
                      {book.sellers && book.sellers.length > 2 && (
                        <button 
                          className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-1"
                          onClick={() => toggleShowAllListings(book.id)}
                        >
                          {showAllListings[book.id] ? 'Show less' : `Show ${book.sellers.length - 2} more listings`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Book Actions */}
                <div className="book-actions">
                  {book.download_link && (
                    <a
                      href={book.download_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="book-action primary"
                    >
                      <FaDownload className="mr-2" />
                      Download
                    </a>
                  )}
                  
                  <button
                    className={`book-action ${book.download_link ? '' : 'primary'}`}
                    onClick={() => toggleExpandBook(book.id)}
                  >
                    <FaInfoCircle className="mr-2" />
                    {expandedBook === book.id ? 'Less Info' : 'More Info'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {!loading && !error && sortedBooks().length > 0 && (
          <div className="pagination">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <FaArrowLeft />
            </button>
            
            {/* Show first page if not in view */}
            {getPageNumbers()[0] > 1 && (
              <>
                <button
                  onClick={() => paginate(1)}
                  className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && <span className="pagination-ellipsis">...</span>}
              </>
            )}
            
            {/* Page Numbers */}
            {getPageNumbers().map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}
            
            {/* Show last page if not in view */}
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                  <span className="pagination-ellipsis">...</span>
                )}
                <button
                  onClick={() => paginate(totalPages)}
                  className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BookSearch;