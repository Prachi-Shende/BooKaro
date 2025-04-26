import React from 'react';
import './resources.css';
import Header from '../components/header';
import Footer from '../components/footer';

function Resources() {
  return (
    <div className="resources-container">
      {/* Header Component */}
      <Header />

      {/* Explore Books Section */}
      <section className="explore-section">
        <div className="explore-content">
          <h1 className="section-title2">Explore Books</h1>
          <p className="section-description">
            Discover a wide selection of books for sale, rent, or exchange. Find your 
            favorite reads and connect with other VJTI students.
          </p>
          <button className="browse-btn">Start Browsing</button>
        </div>
        
        <div className="features-container">
          <div className="feature-card">
            <h2 className="feature-title">Book Details</h2>
            <p className="feature-description">
              Get detailed information about each book, including condition, price, and 
              edition details.
            </p>
            <div className="divider"></div>
          </div>

          <div className="feature-card">
            <h2 className="feature-title">Search & Filter</h2>
            <p className="feature-description">
              Easily search and filter books by title, ISBN, stream, or even book images. 
              Find what you need quickly.
            </p>
            <div className="divider"></div>
          </div>

          <div className="feature-card">
            <h2 className="feature-title">My Orders</h2>
            <p className="feature-description">
              Track your purchased books, view order history, and manage your 
              transactions with ease.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h1 className="faq-main-title">Frequently Asked Questions</h1>
        <h2 className="faq-subtitle">Frequently asked questions</h2>
        
        <div className="faq-tabs">
          <button className="tab active">General</button>
          <button className="tab">Setting up FAQs</button>
        </div>

        <div className="faq-items">
          <div className="faq-item expanded">
            <div className="faq-question">
              <h3>What is an FAQ section?</h3>
              <span className="expand-icon">^</span>
            </div>
            <div className="faq-answer">
              <p>An FAQ section can be used to quickly answer common questions about your business like "Where do you ship to?", "What are your opening hours?", or "How can I book a service?".</p>
              <div className="share-icons">
                <button className="share-btn">f</button>
                <button className="share-btn">t</button>
                <button className="share-btn">in</button>
                <button className="share-btn">🔗</button>
              </div>
            </div>
            <div className="faq-divider"></div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <h3>Why do FAQs matter?</h3>
              <span className="expand-icon">v</span>
            </div>
            <div className="faq-divider"></div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <h3>Where can I add my FAQs?</h3>
              <span className="expand-icon">v</span>
            </div>
            <div className="faq-divider"></div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="blog-intro">
          <h1 className="blog-title">Latest Updates and Tips</h1>
          <p className="blog-description">
            Stay informed with our blog posts on book recommendations, study tips, and industry news.
          </p>
          <button className="read-more-btn">Read More</button>
        </div>

        <div className="blog-grid">
          <div className="blog-card">
            <h2 className="blog-card-title">Study Tips</h2>
            <p className="blog-card-description">
              Share your feature information here to attract new clients. Provide a brief summary to help
              visitors understand the context and background, and add details about what ...
            </p>
            <button className="show-more-btn">Show More</button>
          </div>

          <div className="blog-card">
            <h2 className="blog-card-title">Industry News</h2>
            <p className="blog-card-description">
              Share your feature information here to attract new clients. Provide a brief summary to help
              visitors understand the context and background, and add details about what ...
            </p>
            <button className="show-more-btn">Show More</button>
          </div>

          <div className="blog-card">
            <div className="card-icon">🛒</div>
            <h2 className="blog-card-title">Student Success Stories</h2>
            <p className="blog-card-description">
              Share your feature information here to attract new clients. Provide a brief summary to help
              visitors understand the context and background, and add details about what ...
            </p>
            <button className="show-more-btn">Show More</button>
          </div>

          <div className="blog-card">
            <div className="card-icon">%</div>
            <h2 className="blog-card-title">Author Interviews</h2>
            <p className="blog-card-description">
              Share your feature information here to attract new clients. Provide a brief summary to help
              visitors understand the context and background, and add details about what ...
            </p>
            <button className="show-more-btn">Show More</button>
          </div>
        </div>
      </section>

      {/* Footer Component */}
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
}

export default Resources;