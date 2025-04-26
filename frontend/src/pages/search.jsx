import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Book, User, ExternalLink, Info, Loader, Database, ShoppingCart, Star } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import './search.css';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeSource, setActiveSource] = useState('all');
  const navigate = useNavigate();
  
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const promises = [];
        
        if (activeSource === 'all' || activeSource === 'gutendex') {
          promises.push(fetchGutendexBooks(searchQuery, currentPage));
        }
        
        if (activeSource === 'all' || activeSource === 'openlibrary') {
          promises.push(fetchOpenLibraryBooks(searchQuery, currentPage));
        }
        
        const results = await Promise.all(promises);
        
        let combinedResults = [];
        let totalCount = 0;
        
        results.forEach(result => {
          if (result) {
            combinedResults = [...combinedResults, ...result.books];
            totalCount += result.count;
          }
        });
        
        const uniqueResults = combinedResults.reduce((acc, current) => {
          const titleAuthorKey = `${current.title.toLowerCase()}-${current.authorName?.toLowerCase() || ''}`;
          const exists = acc.find(item => 
            `${item.title.toLowerCase()}-${item.authorName?.toLowerCase() || ''}` === titleAuthorKey
          );
          
          if (!exists) {
            return [...acc, {
              ...current,
              listings: generateRandomListings(Math.floor(Math.random() * 5))
            }];
          }
          return acc;
        }, []);
        
        setSearchResults(uniqueResults);
        setTotalPages(Math.ceil(totalCount / 32));
      } catch (err) {
        console.error('Failed to fetch books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, currentPage, activeSource]);

  const generateRandomListings = (count) => {
    if (count === 0) return [];
    
    const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'];
    const sellerNames = ['BookWorld', 'Literary Haven', 'Page Turner', 'Bookworm\'s Paradise', 'Novel Ideas'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `listing-${Math.random().toString(36).substr(2, 9)}`,
      sellerName: sellerNames[Math.floor(Math.random() * sellerNames.length)],
      price: (Math.random() * 30 + 5).toFixed(2),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      rating: (Math.random() * 2 + 3).toFixed(1),
      shipping: (Math.random() * 5).toFixed(2)
    }));
  };

  const fetchGutendexBooks = async (query, page) => {
    try {
      const response = await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(query)}&page=${page}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const transformedBooks = data.results.map(book => ({
        id: `gutendex-${book.id}`,
        title: book.title,
        authorName: book.authors.map(author => author.name).join(', '),
        coverUrl: book.formats['image/jpeg'] || null,
        subjects: book.subjects || [],
        source: 'Gutendex',
        downloadUrl: getPreferredDownloadUrl(book.formats),
        detailsUrl: `/book/gutendex-${book.id}`,
        originalData: book
      }));
      
      return {
        books: transformedBooks,
        count: data.count
      };
    } catch (error) {
      console.error('Error fetching from Gutendex:', error);
      return null;
    }
  };

  const fetchOpenLibraryBooks = async (query, page) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const transformedBooks = data.docs.slice(0, 32).map(book => ({
        id: `openlibrary-${book.key.replace('/works/', '')}`,
        title: book.title,
        authorName: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
        coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
        subjects: book.subject || [],
        source: 'Open Library',
        downloadUrl: book.ia ? `https://archive.org/details/${book.ia[0]}` : null,
        detailsUrl: `/book/openlibrary-${book.key.replace('/works/', '')}`,
        originalData: book
      }));
      
      return {
        books: transformedBooks,
        count: data.numFound
      };
    } catch (error) {
      console.error('Error fetching from Open Library:', error);
      return null;
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const getPreferredDownloadUrl = (formats) => {
    const preferredFormats = [
      'text/html',
      'application/pdf',
      'text/plain',
      'text/plain; charset=utf-8',
      'application/epub+zip'
    ];
    
    for (const format of preferredFormats) {
      if (formats[format]) {
        return formats[format];
      }
    }
    
    return Object.values(formats)[0] || '#';
  };

  const renderBookCover = (book) => {
    if (book.coverUrl) {
      return (
        <img 
          src={book.coverUrl} 
          alt={`Cover for ${book.title}`} 
          className="book-cover" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-cover.jpg';
          }}
        />
      );
    }
    
    return (
      <div className="book-cover-placeholder">
        <Book size={48} />
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="search-page">
        <div className="container">
          <div className="search-header">
            <h1>Search Results</h1>
            {searchQuery && <p className="search-query">for: "{searchQuery}"</p>}
          </div>

          <div className="source-selector">
            <button 
              className={`source-button ${activeSource === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSource('all')}
            >
              All Sources
            </button>
            <button 
              className={`source-button ${activeSource === 'gutendex' ? 'active' : ''}`}
              onClick={() => setActiveSource('gutendex')}
            >
              Project Gutenberg
            </button>
            <button 
              className={`source-button ${activeSource === 'openlibrary' ? 'active' : ''}`}
              onClick={() => setActiveSource('openlibrary')}
            >
              Open Library
            </button>
          </div>

          {loading ? (
            <div className="loading-container">
              <Loader size={48} className="spinner" />
              <p>Loading books...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                Try Again
              </button>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="no-results">
              <Info size={48} />
              <h2>No books found</h2>
              {searchQuery ? (
                <p>We couldn't find any books matching "{searchQuery}". Please try a different search term.</p>
              ) : (
                <p>Enter a search term to find books.</p>
              )}
            </div>
          ) : (
            <>
              <div className="search-results-count">
                <p>Found {searchResults.length} book(s)</p>
              </div>
              
              <div className="book-grid">
                {searchResults.map((book, index) => (
                  <div key={book.id} className="book-card">
                    <div className="book-card-header">
                      <span className="book-number">#{(currentPage - 1) * 32 + index + 1}</span>
                    </div>
                    <div className="book-card-content">
                      {renderBookCover(book)}
                      
                      <div className="book-details">
                        <h3 className="book-title">{book.title}</h3>
                        
                        <div className="book-authors">
                          <User size={14} />
                          <p>{book.authorName || 'Unknown Author'}</p>
                        </div>
                        
                        <div className="book-source">
                          <Database size={14} />
                          <p>Source: {book.source}</p>
                        </div>
                        
                        {book.subjects && book.subjects.length > 0 && (
                          <div className="book-subjects">
                            <p className="subjects-label">Subjects:</p>
                            <div className="subjects-list">
                              {book.subjects.slice(0, 3).map((subject, index) => (
                                <span key={index} className="subject-tag">{subject}</span>
                              ))}
                              {book.subjects.length > 3 && <span className="more-tag">+{book.subjects.length - 3} more</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="book-listings-section">
                      <h4 className="listings-header">
                        <ShoppingCart size={16} />
                        Available for Purchase
                      </h4>
                      
                      {book.listings && book.listings.length > 0 ? (
                        <div className="book-listings">
                          {book.listings.map(listing => (
                            <div key={listing.id} className="book-listing-item">
                              <div className="listing-info">
                                <div className="listing-seller">
                                  <span className="seller-name">{listing.sellerName}</span>
                                  <div className="seller-rating">
                                    <Star size={12} className="star-icon" />
                                    <span>{listing.rating}</span>
                                  </div>
                                </div>
                                <div className="listing-details">
                                  <span className="book-condition">{listing.condition}</span>
                                  <span className="book-price">${listing.price}</span>
                                  <span className="shipping-info">+${listing.shipping} shipping</span>
                                </div>
                              </div>
                              <button className="buy-button">
                                Buy Now
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="no-listings">No sellers currently listing this book</p>
                      )}
                    </div>
                    
                    <div className="book-actions">
                      {book.downloadUrl && (
                        <a 
                          href={book.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="download-button"
                        >
                          <ExternalLink size={16} />
                          Read Book
                        </a>
                      )}
                      
                      <Link 
                        to={`/book/${book.id}`} 
                        className="details-button"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-button prev" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <div className="pagination-pages">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          className={`pagination-page ${pageNum === currentPage ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && (
                      <>
                        <span className="pagination-ellipsis">...</span>
                        <button
                          className={`pagination-page ${totalPages === currentPage ? 'active' : ''}`}
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  
                  <button 
                    className="pagination-button next" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;