import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Book, User, Calendar, Database, Bookmark, 
  ShoppingCart, Heart, Share2, Download, 
  Star, ChevronLeft, Loader, Globe,
  BookOpen, AlertCircle, Send, Plus,
  Minus, FileText, Check, ArrowLeft
} from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import './detailedpg.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('paperback');
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (id.startsWith('gutendex-')) {
          const gutendexId = id.replace('gutendex-', '');
          const response = await fetch(`https://gutendex.com/books/${gutendexId}`);
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          
          setBook({
            id: id,
            title: data.title,
            authorName: data.authors.map(author => author.name).join(', '),
            authorBirthYear: data.authors[0]?.birth_year || 'Unknown',
            authorDeathYear: data.authors[0]?.death_year || 'Present',
            coverUrl: data.formats['image/jpeg'] || null,
            subjects: data.subjects || [],
            languages: data.languages || [],
            downloadCount: data.download_count || 0,
            formats: Object.keys(data.formats).map(format => ({
              type: format,
              url: data.formats[format]
            })),
            source: 'Project Gutenberg',
            downloadUrl: getPreferredDownloadUrl(data.formats),
            description: generateDescription(data.title, data.authors, data.subjects),
            isbn: 'N/A',
            publishYear: data.copyright ? 'Under copyright' : 'Public Domain',
            publisher: 'Project Gutenberg',
            listings: generateRandomListings(Math.floor(Math.random() * 4) + 2),
            originalData: data
          });
          
          setRelatedBooks(generateRelatedBooks(data.subjects));
          setReviews(generateRandomReviews());
        } else if (id.startsWith('openlibrary-')) {
          const openLibraryId = id.replace('openlibrary-', '');
          const response = await fetch(`https://openlibrary.org/works/${openLibraryId}.json`);
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          
          // Fetch author details if available
          let authorDetails = {};
          if (data.authors && data.authors.length > 0) {
            const authorId = data.authors[0].author.key.replace('/authors/', '');
            const authorResponse = await fetch(`https://openlibrary.org/authors/${authorId}.json`);
            if (authorResponse.ok) {
              authorDetails = await authorResponse.json();
            }
          }
          
          setBook({
            id: id,
            title: data.title,
            authorName: data.authors ? data.authors.map(a => a.author.name).join(', ') : 'Unknown Author',
            authorBirthYear: authorDetails.birth_date || 'Unknown',
            authorDeathYear: authorDetails.death_date || 'Present',
            coverUrl: data.covers ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : null,
            subjects: data.subjects || [],
            languages: data.languages?.map(lang => lang.key.replace('/languages/', '')) || [],
            downloadCount: 0,
            formats: [],
            source: 'Open Library',
            downloadUrl: null,
            description: data.description ? 
              (typeof data.description === 'string' ? data.description : data.description.value) : 
              'No description available',
            isbn: data.isbn ? data.isbn[0] : 'N/A',
            publishYear: data.first_publish_date || 'Unknown',
            publisher: data.publishers ? data.publishers.join(', ') : 'Unknown',
            listings: generateRandomListings(Math.floor(Math.random() * 4) + 2),
            originalData: data
          });
          
          setRelatedBooks(generateRelatedBooks(data.subjects || []));
          setReviews(generateRandomReviews());
        } else {
          throw new Error('Invalid book ID format');
        }
      } catch (err) {
        console.error('Failed to fetch book details:', err);
        setError('Failed to load book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

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

  const generateDescription = (title, authors, subjects) => {
    const authorNames = authors.map(author => author.name).join(' and ');
    const subjectsList = subjects.slice(0, 5).join(', ');
    
    return `"${title}" is a classic work by ${authorNames}. This book explores themes of ${subjectsList}.`;
  };

  const generateRandomListings = (count) => {
    const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'];
    const sellerNames = ['BookWorld', 'Literary Haven', 'Page Turner', 'Bookworm\'s Paradise', 'Novel Ideas'];
    const formats = ['Paperback', 'Hardcover', 'eBook', 'Audiobook'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `listing-${Math.random().toString(36).substr(2, 9)}`,
      sellerName: sellerNames[Math.floor(Math.random() * sellerNames.length)],
      price: (Math.random() * 30 + 5).toFixed(2),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      format: formats[Math.floor(Math.random() * formats.length)],
      rating: (Math.random() * 2 + 3).toFixed(1),
      shipping: (Math.random() * 5).toFixed(2),
      estimatedDelivery: `${Math.floor(Math.random() * 7) + 2}-${Math.floor(Math.random() * 7) + 10} days`,
      inStock: Math.floor(Math.random() * 20) + 1
    }));
  };

  const generateRelatedBooks = (subjects) => {
    const bookTitles = [
      'The Great Adventure', 'Midnight Tales', 'Beyond the Horizon', 
      'Whispers in the Wind', 'The Lost Key', 'Echoes of Time', 
      'The Hidden Path', 'Forgotten Stories', 'The Last Chapter'
    ];
    
    const authors = [
      'John Smith', 'Emily Johnson', 'Robert Williams', 
      'Sarah Brown', 'Michael Davis', 'Laura Wilson', 
      'David Miller', 'Jennifer Taylor', 'James Anderson'
    ];
    
    return Array.from({ length: 6 }, (_, i) => ({
      id: `related-${Math.random().toString(36).substr(2, 9)}`,
      title: bookTitles[Math.floor(Math.random() * bookTitles.length)],
      author: authors[Math.floor(Math.random() * authors.length)],
      coverUrl: null,
      price: (Math.random() * 25 + 5).toFixed(2),
      rating: (Math.random() * 2 + 3).toFixed(1),
      subjects: subjects ? subjects.slice(0, Math.floor(Math.random() * 3) + 1) : []
    }));
  };

  const generateRandomReviews = () => {
    const reviewContents = [
      "I really enjoyed this book. The characters were well-developed and the plot kept me engaged throughout.",
      "A classic that still resonates today. The themes explored in this book are timeless.",
      "Beautifully written with vivid descriptions. I was completely immersed in the world the author created.",
      "A thought-provoking read that challenges conventional thinking. Highly recommended!",
      "While the premise was interesting, I found the pacing a bit slow. Still worth reading though.",
      "One of my favorite books of all time. I've read it multiple times and always discover something new."
    ];
    
    const reviewerNames = [
      "BookLover42", "LiteraryFan", "ReadingEnthusiast", 
      "ClassicsFan", "ModernReader", "BookwormJones",
      "PageTurner", "NovelAddict", "ReadAndReview"
    ];
    
    return Array.from({ length: 4 }, (_, i) => ({
      id: `review-${Math.random().toString(36).substr(2, 9)}`,
      reviewer: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      rating: Math.floor(Math.random() * 3) + 3,
      content: reviewContents[Math.floor(Math.random() * reviewContents.length)],
      likes: Math.floor(Math.random() * 100),
      verified: Math.random() > 0.3
    }));
  };

  const renderBookCover = (book) => {
    if (book?.coverUrl) {
      return (
        <img 
          src={book.coverUrl} 
          alt={`Cover for ${book.title}`} 
          className="book-detail-cover" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-cover.jpg';
          }}
        />
      );
    }
    
    return (
      <div className="book-detail-cover-placeholder">
        <Book size={64} />
      </div>
    );
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleAddToCart = () => {
    alert(`Added ${quantity} ${selectedFormat} ${book.title} to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={16} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} size={16} className="star half-filled" />);
      } else {
        stars.push(<Star key={i} size={16} className="star empty" />);
      }
    }
    
    return stars;
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="book-detail-page">
          <div className="container">
            <div className="loading-container">
              <Loader size={48} className="spinner" />
              <p>Loading book details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="book-detail-page">
          <div className="container">
            <div className="error-container">
              <AlertCircle size={48} />
              <p className="error-message">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Header />
        <div className="book-detail-page">
          <div className="container">
            <div className="no-results">
              <AlertCircle size={48} />
              <h2>Book Not Found</h2>
              <p>The requested book could not be found.</p>
              <button onClick={handleBackClick} className="back-button">
                <ArrowLeft size={16} /> Back to Search
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="book-detail-page">
        <div className="container">
          <button onClick={handleBackClick} className="back-link">
            <ChevronLeft size={20} /> Back to Results
          </button>
          
          <div className="book-detail-container">
            <div className="book-detail-header">
              <div className="book-detail-cover-container">
                {renderBookCover(book)}
              </div>
              
              <div className="book-detail-info">
                <h1 className="book-detail-title">{book.title}</h1>
                <p className="book-detail-author">by {book.authorName}</p>
                
                <div className="book-detail-meta">
                  <span className="book-detail-meta-item">
                    <Database size={16} /> Source: {book.source}
                  </span>
                  <span className="book-detail-meta-item">
                    <Calendar size={16} /> Published: {book.publishYear}
                  </span>
                  {book.downloadCount > 0 && (
                    <span className="book-detail-meta-item">
                      <Download size={16} /> {book.downloadCount.toLocaleString()} downloads
                    </span>
                  )}
                </div>
                
                <div className="book-detail-actions">
                  <button 
                    className={`saved-button ${isFavorite ? 'active' : ''}`}
                    onClick={toggleFavorite}
                  >
                    <Heart size={18} /> {isFavorite ? 'Saved' : 'Save'}
                  </button>
                  <button className="share-button">
                    <Share2 size={18} /> Share
                  </button>
                </div>
                
                <p className="book-detail-description">{book.description}</p>
              </div>
            </div>
            
            <div className="purchase-options-section">
              <h3 className="purchase-options-title">Purchase Options</h3>
              <div className="purchase-options-container">
                <select 
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="format-select"
                >
                  {book.listings
                    .map(l => l.format)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map(format => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                </select>
                
                <div className="quantity-selector">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="quantity-button"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 99}
                    className="quantity-button"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="add-to-cart-button"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
            
            <div className="book-info-sections">
              <div className="info-tabs">
                <div 
                  className={`info-tab ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  <FileText size={16} /> Details
                </div>
                <div 
                  className={`info-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  <Star size={16} /> Reviews ({reviews.length})
                </div>
                <div 
                  className={`info-tab ${activeTab === 'related' ? 'active' : ''}`}
                  onClick={() => setActiveTab('related')}
                >
                  <BookOpen size={16} /> Related Books
                </div>
              </div>
              
              <div className="info-content">
                {activeTab === 'details' && (
                  <div>
                    <table className="book-details-table">
                      <tbody>
                        <tr>
                          <th>Author</th>
                          <td>{book.authorName}</td>
                        </tr>
                        <tr>
                          <th>Publisher</th>
                          <td>{book.publisher}</td>
                        </tr>
                        <tr>
                          <th>Publication Year</th>
                          <td>{book.publishYear}</td>
                        </tr>
                        <tr>
                          <th>Source</th>
                          <td>{book.source}</td>
                        </tr>
                        {book.isbn !== 'N/A' && (
                          <tr>
                            <th>ISBN</th>
                            <td>{book.isbn}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    
                    <h4>Subjects</h4>
                    <div className="subjects-list">
                      {book.subjects.slice(0, 10).map((subject, index) => (
                        <span key={index} className="subject-tag">{subject}</span>
                      ))}
                    </div>
                    
                    <h4>Languages</h4>
                    <div className="languages-list">
                      {book.languages.map((language, index) => (
                        <span key={index} className="language-tag">
                          <Globe size={14} /> {language}
                        </span>
                      ))}
                    </div>
                    
                    {book.formats && book.formats.length > 0 && (
                      <>
                        <h4>Available Formats</h4>
                        <div className="formats-list">
                          {book.formats.map((format, index) => {
                            // Create more readable format names
                            const formatName = format.type
                              .replace('application/', '')
                              .replace('text/', '')
                              .replace('; charset=utf-8', '')
                              .replace('image/', '')
                              .toUpperCase();
                              
                            return (
                              <a 
                                key={index} 
                                href={format.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="format-link"
                              >
                                {formatName}
                              </a>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="reviews-section">
                    <div className="reviews-header">
                      <h3 className="reviews-title">Reader Reviews</h3>
                      <button className="write-review-button">
                        Write a Review
                      </button>
                    </div>
                    
                    {reviews.length > 0 ? (
                      reviews.map(review => (
                        <div key={review.id} className="review-item">
                          <div className="review-header">
                            <div className="reviewer-info">
                              <span className="reviewer-name">{review.reviewer}</span>
                              {review.verified && (
                                <span className="verified-badge">
                                  <Check size={12} /> Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="review-meta">
                              <div className="review-rating">
                                {renderStars(review.rating)}
                              </div>
                              <span className="review-date">{review.date}</span>
                            </div>
                          </div>
                          <p className="review-content">{review.content}</p>
                          <div className="review-actions">
                            <button className="like-button">
                              <Heart size={14} /> Like ({review.likes})
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-reviews">No reviews yet for this book.</p>
                    )}
                  </div>
                )}
                
                {activeTab === 'related' && (
                  <div className="related-books">
                    <div className="related-books-grid">
                      {relatedBooks.map(book => (
                        <div key={book.id} className="related-book-card">
                          <div className="related-book-cover">
                            <Book size={48} />
                          </div>
                          <div className="related-book-info">
                            <h5>{book.title}</h5>
                            <p>by {book.author}</p>
                            <div className="related-book-meta">
                              <div className="related-book-rating">
                                {renderStars(book.rating)}
                              </div>
                              <span className="related-book-price">${book.price}</span>
                            </div>
                            <button className="view-related-book">
                              View Book
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetail;