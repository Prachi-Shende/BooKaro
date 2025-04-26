import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, MessageSquare, Menu, X } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import vjtiLibrary from './vjtilibrary.webp';

const BooKaroHomepage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const recommendedBooks = [
    { id: 1, title: "Engineering Mathematics Vol 1", author: "H.K. Dass", price: 450 },
    { id: 2, title: "Data Structures Using C", author: "Reema Thareja", price: 380 },
    { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", price: 650 },
    { id: 4, title: "Design Patterns", author: "Erich Gamma et al", price: 550 },
    { id: 5, title: "Digital Logic Design", author: "Morris Mano", price: 420 },
    { id: 6, title: "Analog Electronics", author: "Robert Boylestad", price: 390 },
    { id: 7, title: "Operating System Concepts", author: "Silberschatz, Galvin", price: 580 },
    { id: 8, title: "Database Management Systems", author: "Raghu Ramakrishnan", price: 490 },
    { id: 9, title: "Discrete Mathematics", author: "Kenneth Rosen", price: 430 },
    { id: 10, title: "Computer Organization", author: "Carl Hamacher", price: 520 },
    { id: 11, title: "Calculus: Early Transcendentals", author: "James Stewart", price: 610 },
    { id: 12, title: "Physics for Engineers", author: "Giancoli", price: 570 },
    ];

  
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Header />

      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${vjtiLibrary})` }}>
  <div className="hero-overlay">
    <h1 className="hero-title">Book Shopping Made Easy</h1>
    <p className="hero-description">
      Welcome to BooKaro, your go-to platform for buying, selling, and renting books. 
      Connect with VJTI students to discover a wide range of books for your academic needs.
    </p>
    <button className="hero-button">
      Explore
    </button>
  </div>
</div>

      {/* Recommended Books Section */}
      <section className="recommended-section">
        <div className="recommended-container">
          <h2 className="section-title">Recommended Books</h2>
          <p className="section-description">
            Discover the most popular engineering textbooks among VJTI students
          </p>
          
          <div className="recommended-books-carousel">
            <div className="recommended-books-grid">
              {recommendedBooks.map(book => (
                <div key={book.id} className="book-card">
                  <div className="book-image">
                    {/* Placeholder for book cover */}
                    <div className="book-cover-placeholder">
                      <span>{book.title.split(' ').map(word => word[0]).join('')}</span>
                    </div>
                  </div>
                  <div className="book-details">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <p className="book-price">₹{book.price}.00</p>
                    <div className="book-actions">
                      <button className="book-cart-button">Add to Cart</button>
                      <button className="book-wishlist-button">♡</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="browse-more-container">
            <button className="browse-more-button">
              Browse All Books
            </button>
          </div>
        </div>
      </section>

      

      {/* Key Offerings Section */}
      <section className="offerings-section">
        <h2 className="section-title">Key Offerings</h2>
        <div className="offerings-container">
          <div className="offerings-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <div className="feature-icon-circle">
                  <MessageSquare className="feature-icon" />
                </div>
              </div>
              <h3 className="feature-title">Chat and Negotiate</h3>
              <p className="feature-description">
                Engage in direct conversations with sellers or buyers to negotiate prices and finalize transactions smoothly.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <div className="feature-icon-circle">
                  <Search className="feature-icon" />
                </div>
              </div>
              <h3 className="feature-title">Search and Filter</h3>
              <p className="feature-description">
                Easily search and filter books based on titles, ISBN, stream, and VJTI curriculum. Get exactly what you are looking for.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <div className="feature-icon-circle">
                  <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="feature-title">Dynamic Pricing</h3>
              <p className="feature-description">
                Benefit from dynamic pricing that adjusts based on market conditions, ensuring competitive rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-container">
          <h2 className="section-title">Featured Books</h2>
          <div className="products-grid">
            {/* Product 1 */}
            <div className="product-card">
              <div className="product-image">
                <div className="product-badge">
                  BEST SELLER
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-title">Engineering Mathematics</h3>
                <p className="product-author">by H.K. Dass</p>
                <p className="product-price">₹585.00</p>
                <button className="product-button">
                  Add to Cart
                </button>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="product-card">
              <div className="product-image"></div>
              <div className="product-details">
                <h3 className="product-title">Programming in C</h3>
                <p className="product-author">by Balaguruswamy</p>
                <p className="product-price">₹420.00</p>
                <button className="product-button">
                  Add to Cart
                </button>
              </div>
            </div>
            
            {/* Product 3 */}
            <div className="product-card">
              <div className="product-image"></div>
              <div className="product-details">
                <h3 className="product-title">Data Structures</h3>
                <p className="product-author">by Tanenbaum</p>
                <p className="product-price">₹350.00</p>
                <button className="product-button">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          <div className="load-more-container">
            <button className="load-more-button">
              Load More
            </button>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="reviews-section">
        <h2 className="section-title">Client Reviews</h2>
        <div className="reviews-container">
          <div className="reviews-grid">
            {/* Review 1 */}
            <div className="review-card">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  RP
                </div>
                <p className="reviewer-name">Raj Patel</p>
              </div>
              <p className="review-text">
                "I sold my old engineering books within days on BooKaro. Great platform!"
              </p>
              <div className="review-rating">
                ★★★★★
              </div>
            </div>
            
            {/* Review 2 */}
            <div className="review-card">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  PS
                </div>
                <p className="reviewer-name">Priya Singh</p>
              </div>
              <p className="review-text">
                "The chat feature helped me negotiate a better price for the books I wanted. Amazing experience!"
              </p>
              <div className="review-rating">
                ★★★★★
              </div>
            </div>
            
            {/* Review 3 */}
            <div className="review-card">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  ND
                </div>
                <p className="reviewer-name">Nikhil Desai</p>
              </div>
              <p className="review-text">
                "Buying books on BooKaro was so convenient. The search options are fantastic!"
              </p>
              <div className="review-rating">
                ★★★★☆
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Get in Touch Today</h2>
          <p className="contact-description">Have a question or feedback? Reach out to us for assistance.</p>
          
          <div className="contact-form-container">
            <h3 className="form-title">Contact us</h3>
            
            <form className="contact-form">
              <div className="form-group">
                <label className="form-label">First name</label>
                <input 
                  type="text" 
                  placeholder="First name" 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Last name</label>
                <input 
                  type="text" 
                  placeholder="Last name" 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  className="form-input"
                />
              </div>
              
              <div className="form-group-full">
                <label className="form-label">Message *</label>
                <textarea 
                  placeholder="Message" 
                  className="form-textarea"
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="form-group-full">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <Footer />
      

      <style jsx>{`
        /* General Styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        /* Navigation Bar */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        @media (min-width: 768px) {
          .navbar {
            padding: 16px 24px;
          }
        }
        
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo-circle {
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background-color: rgb(207, 126, 82);
          margin-right: 8px;
        }
        
        .logo-text {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }
        
        /* Search Bar */
        .search-bar-desktop {
          display: none;
          align-items: center;
          background-color: #f3f4f6;
          border-radius: 9999px;
          padding: 8px 16px;
          flex: 1;
          max-width: 32rem;
          margin: 0 24px;
          border: 1px solid rgba(207, 126, 82, 0.3);
          transition: all 0.3s;
        }
        
        .search-bar-desktop:focus-within {
          border-color: rgba(207, 126, 82, 1);
        }
        
        @media (min-width: 768px) {
          .search-bar-desktop {
            display: flex;
          }
        }
        
        .search-input {
          background-color: transparent;
          border: none;
          outline: none;
          flex: 1;
        }
        
        .search-icon {
          color: rgb(207, 126, 82);
        }
        
        /* Navbar Icons */
        .navbar-icons {
          display: flex;
          align-items: center;
        }
        
        .navbar-icons > * {
          margin-left: 16px;
          color: rgb(207, 126, 82);
          cursor: pointer;
          height: 24px;
          width: 24px;
        }
        
        @media (min-width: 768px) {
          .navbar-icons > * {
            margin-left: 24px;
          }
        }
        
        .mobile-search-icon {
          display: block;
        }
        
        @media (min-width: 768px) {
          .mobile-search-icon {
            display: none;
          }
        }
        
        .user-icon, .message-icon {
          display: none;
        }
        
        @media (min-width: 640px) {
          .user-icon, .message-icon {
            display: block;
          }
        }
        
        .mobile-menu-toggle {
          display: block;
          cursor: pointer;
        }
        
        @media (min-width: 768px) {
          .mobile-menu-toggle {
            display: none;
          }
        }
        
        /* Mobile Search */
        .mobile-search {
          display: block;
          padding: 12px 16px;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        @media (min-width: 768px) {
          .mobile-search {
            display: none;
          }
        }
        
        .mobile-search-container {
          display: flex;
          align-items: center;
          background-color: #f3f4f6;
          border-radius: 9999px;
          padding: 8px 16px;
          border: 1px solid rgb(207, 126, 82);
        }
        
        .mobile-search-input {
          background-color: transparent;
          border: none;
          outline: none;
          flex: 1;
        }
        
        .mobile-search-button {
          color: rgb(207, 126, 82);
        }
        
        /* Mobile Menu */
        .mobile-menu {
          display: block;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        @media (min-width: 768px) {
          .mobile-menu {
            display: none;
          }
        }
        
        .mobile-menu-items {
          display: flex;
          flex-direction: column;
          padding: 16px 0;
        }
        
        .mobile-menu-item {
          padding: 12px 24px;
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        
        .mobile-menu-item:hover {
          background-color: rgba(207, 126, 82, 0.1);
        }
        
        .mobile-menu-item svg {
          margin-right: 12px;
        }
        
        /* Hero Section */
.hero-section {
  position: relative;
  height: 16rem;
  background-size: cover;
  background-position: center;
  background-image: url('/api/placeholder/1200/500');
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5); /* Soft dark overlay */
  backdrop-filter: blur(0px);    /* Slight blur effect */
  z-index: 1;
}

@media (min-width: 640px) {
  .hero-section {
    height: 20rem;
  }
}

@media (min-width: 768px) {
  .hero-section {
    height: 24rem;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 16px;
  z-index: 2; /* Make sure content is above the overlay */
}

.hero-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 16px;
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 36px;
    margin-bottom: 16px;
  }
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 48px;
    margin-bottom: 24px;
  }
}

.hero-description {
  max-width: 42rem;
  margin-bottom: 24px;
  font-size: 14px;
}

@media (min-width: 640px) {
  .hero-description {
    margin-bottom: 24px;
    font-size: 16px;
  }
}

@media (min-width: 768px) {
  .hero-description {
    margin-bottom: 32px;
    font-size: 18px;
  }
}

.hero-button {
  background-color: rgb(207, 126, 82);
  color: black;
  font-weight: 500;
  padding: 8px 24px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

@media (min-width: 768px) {
  .hero-button {
    padding: 12px 32px;
  }
}

.hero-button:hover {
  background-color: rgba(207, 126, 82, 0.9);
}
/* Recommended Section */
.recommended-section {
  padding: 48px 16px;
  background-color: #fbfbfb;
}

@media (min-width: 768px) {
  .recommended-section {
    padding: 64px 24px;
  }
}

.recommended-container {
  max-width: 72rem;
  margin: 0 auto;
}

.section-title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 36px;
    margin-bottom: 24px;
  }
}

.section-description {
  text-align: center;
  color: #6b7280;
  max-width: 48rem;
  margin: 0 auto 32px;
  font-size: 16px;
}

.recommended-books-carousel {
  overflow-x: auto;
  padding-bottom: 16px;
  margin-bottom: 32px;
}

.recommended-books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

@media (max-width: 639px) {
  .recommended-books-grid {
    display: flex;
    gap: 16px;
  }
  
  .book-card {
    flex: 0 0 240px;
  }
}

.book-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.book-card:hover {
  transform: translateY(-8px);
}

.book-image {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}

.book-cover-placeholder {
  width: 140px;
  height: 180px;
  background-color: rgb(207, 126, 82);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: 700;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

.book-details {
  padding: 16px;
}

.book-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  line-height: 1.3;
}

.book-author {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 8px;
}

.book-price {
  font-weight: 600;
  margin-bottom: 16px;
  color: #111827;
}

.book-actions {
  display: flex;
  gap: 8px;
}

.book-cart-button {
  flex: 1;
  background-color: rgb(207, 126, 82);
  color: black;
  border: none;
  padding: 8px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.book-cart-button:hover {
  background-color: rgba(207, 126, 82, 0.85);
}

.book-wishlist-button {
  width: 36px;
  background-color: white;
  border: 1px solid rgb(207, 126, 82);
  color: rgb(207, 126, 82);
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.book-wishlist-button:hover {
  background-color: rgba(207, 126, 82, 0.1);
}

.browse-more-container {
  display: flex;
  justify-content: center;
}

.browse-more-button {
  background-color: transparent;
  border: 1px solid rgb(207, 126, 82);
  color: rgb(207, 126, 82);
  font-weight: 500;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.browse-more-button:hover {
  background-color: rgba(207, 126, 82, 0.1);
}
        

        /* Offerings Section */
        .offerings-section {
          padding: 48px 16px;
        }
        
        @media (min-width: 768px) {
          .offerings-section {
            padding: 64px 24px;
          }
        }
        
        .section-title {
          font-size: 30px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 32px;
        }
        
        @media (min-width: 768px) {
          .section-title {
            font-size: 36px;
            margin-bottom: 48px;
          }
        }
        
        .offerings-container {
          max-width: 72rem;
          margin: 0 auto;
        }
        
        .offerings-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        
        @media (min-width: 640px) {
          .offerings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .offerings-grid > div:last-child {
            grid-column: span 2;
          }
        }
        
        @media (min-width: 1024px) {
          .offerings-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .offerings-grid > div:last-child {
            grid-column: span 1;
          }
        }
        
        .feature-card {
          background-color: #f3f4f6;
          padding: 24px;
          border-radius: 8px;
          text-align: center;
          transition: all 0.3s;
        }
        
        @media (min-width: 768px) {
          .feature-card {
            padding: 32px;
          }
        }
        
        .feature-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          background-color: rgba(207, 126, 82, 0.05);
        }
        
        .feature-icon-container {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }
        
        .feature-icon-circle {
          padding: 12px;
          border-radius: 9999px;
          background-color: rgba(207, 126, 82, 0.2);
        }
        
        .feature-icon {
          width: 24px;
          height: 24px;
          color: rgb(207, 126, 82);
        }
        
        .feature-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .feature-description {
          color: #6b7280;
          font-size: 14px;
        }
        
        /* Products Section */
        .products-section {
          padding: 48px 16px;
          background-color: #fbfbfb;
        }
        
        @media (min-width: 768px) {
          .products-section {
            padding: 64px 24px;
          }
        }
        
        .products-container {
          max-width: 72rem;
          margin: 0 auto;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        @media (min-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .product-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
        }
        
        .product-image {
          position: relative;
          height: 12rem;
          background-color: #f3f4f6;
          background-image: url('/api/placeholder/400/300');
          background-size: cover;
          background-position: center;
        }
        
        .product-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: rgb(207, 126, 82);
          color: black;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .product-details {
          padding: 16px;
        }
        
        .product-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .product-author {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 8px;
        }
        
        .product-price {
          font-weight: 600;
          margin-bottom: 16px;
          color: #111827;
        }
        
        .product-button {
          display: block;
          width: 100%;
          background-color: rgb(207, 126, 82);
          color: black;
          border: none;
          padding: 8px;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .product-button:hover {
          background-color: rgba(207, 126, 82, 0.85);
        }
        
        .load-more-container {
          display: flex;
          justify-content: center;
        }
        
        .load-more-button {
          background-color: transparent;
          border: 1px solid rgb(207, 126, 82);
          color: rgb(207, 126, 82);
          font-weight: 500;
          padding: 8px 24px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .load-more-button:hover {
          background-color: rgba(207, 126, 82, 0.1);
        }
        
        /* Reviews Section */
        .reviews-section {
          padding: 48px 16px;
        }
        
        @media (min-width: 768px) {
          .reviews-section {
            padding: 64px 24px;
          }
        }
        
        .reviews-container {
          max-width: 72rem;
          margin: 0 auto;
        }
        
        .reviews-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        
        @media (min-width: 640px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .reviews-grid > div:last-child {
            grid-column: span 2;
          }
        }
        
        @media (min-width: 1024px) {
          .reviews-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .reviews-grid > div:last-child {
            grid-column: span 1;
          }
        }
        
        .review-card {
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .reviewer-info {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgb(207, 126, 82);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-right: 12px;
        }
        
        .reviewer-name {
          font-weight: 500;
        }
        
        .review-text {
          margin-bottom: 16px;
          color: #4b5563;
          font-style: italic;
        }
        
        .review-rating {
          color: #f59e0b;
        }
        
        /* Contact Section */
        .contact-section {
          padding: 48px 16px;
          background-color: #fbfbfb;
        }
        
        @media (min-width: 768px) {
          .contact-section {
            padding: 64px 24px;
          }
        }
        
        .contact-container {
          max-width: 72rem;
          margin: 0 auto;
          text-align: center;
        }
        
        .contact-description {
          max-width: 32rem;
          margin: 0 auto 32px;
          color: #6b7280;
        }
        
        .contact-form-container {
          max-width: 32rem;
          margin: 0 auto;
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: left;
        }
        
        .form-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
          text-align: center;
        }
        
        .contact-form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group-full {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
        }
        
        .form-label {
          margin-bottom: 4px;
          font-size: 14px;
          color: #4b5563;
        }
        
        .form-input, .form-textarea {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .submit-button {
          background-color: rgb(207, 126, 82);
          color: black;
          border: none;
          padding: 10px;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .submit-button:hover {
          background-color: rgba(207, 126, 82, 0.85);
        }
        
        /* Newsletter Section */
        .newsletter-section {
          padding: 32px 16px;
          background-color: rgb(207, 126, 82);
        }
        
        .newsletter-container {
          max-width: 72rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        @media (min-width: 768px) {
          .newsletter-container {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
        
        .newsletter-content {
          margin-bottom: 16px;
        }
        
        @media (min-width: 768px) {
          .newsletter-content {
            margin-bottom: 0;
          }
        }
        
        .newsletter-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 4px;
          color: white;
        }
        
        .newsletter-description {
          color: white;
          opacity: 0.9;
        }
        
        .newsletter-form {
          display: flex;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .newsletter-form {
            width: auto;
          }
        }
        
        .newsletter-input {
          flex: 1;
          padding: 8px 16px;
          border: none;
          border-radius: 4px 0 0 4px;
          outline: none;
        }
        
        .newsletter-button {
          background-color: #333;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .newsletter-button:hover {
          background-color: #111;
        }
        
        /* Footer */
        .footer {
          background-color: #1f2937;
          color: white;
          padding: 48px 16px 24px;
        }
        
        .footer-content {
          max-width: 72rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }
        
        @media (min-width: 640px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .footer-content {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .footer-logo-circle {
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background-color: rgb(207, 126, 82);
          margin-right: 8px;
        }
        
        .footer-logo-text {
          font-size: 20px;
          font-weight: 700;
        }
        
        .footer-description {
          color: #d1d5db;
          font-size: 14px;
        }
        
        .footer-heading {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .footer-links {
          list-style-type: none;
        }
        
        .footer-link {
          display: block;
          color: #d1d5db;
          text-decoration: none;
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        
        .footer-link:hover {
          color: rgb(207, 126, 82);
        }
        
        .social-links {
          display: flex;
          margin-bottom: 16px;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          margin-right: 12px;
          color: white;
          transition: background-color 0.2s;
        }
        
        .social-link:hover {
          background-color: rgb(207, 126, 82);
          color: #1f2937;
        }
        
        .social-icon {
          height: 16px;
          width: 16px;
        }
        
        .contact-info-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .contact-info-item {
          color: #d1d5db;
          font-size: 14px;
          margin-bottom: 4px;
        }
        
        .copyright {
          max-width: 72rem;
          margin: 0 auto;
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #9ca3af;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default BooKaroHomepage;