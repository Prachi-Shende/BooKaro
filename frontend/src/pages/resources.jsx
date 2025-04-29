import React, { useState, useEffect } from 'react';
import './resources.css';
import Header from '../components/header';
import Footer from '../components/footer';

function Resources() {
  const [activeTab, setActiveTab] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (itemIndex) => {
    // If the clicked item is already expanded, close it
    if (expandedFaq === itemIndex) {
      setExpandedFaq(null);
    } else {
      // Otherwise, expand the clicked item and close others
      setExpandedFaq(itemIndex);
    }
  };

  // Clean up effect not needed anymore since we don't attach direct DOM listeners

  return (
    <div className="resources-container">
      {/* Header Component */}
      <Header />

      {/* Explore Books Section */}
      <section className="explore-section">
        <div className="explore-content">
          <h1 className="blog-title">Explore Books</h1>
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
        
        <div className="faq-tabs">
          <button 
            className={`tab ${activeTab === 'general' ? 'active' : ''}`} 
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`tab ${activeTab === 'setup' ? 'active' : ''}`} 
            onClick={() => setActiveTab('setup')}
          >
            Setting up FAQs
          </button>
        </div>

        {/* General FAQs Content */}
        <div className={`faq-content ${activeTab !== 'general' ? 'hidden' : ''}`} id="general-faqs">
          <div className="faq-items">
            {/* FAQ Item 1 */}
            <div 
              className={`faq-item ${expandedFaq === 'general-1' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('general-1')}
            >
              <div className="faq-question">
                <h3>What is BooKaro?</h3>
                <span className="expand-icon">{expandedFaq === 'general-1' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>BooKaro is a platform for VJTI students to buy, sell, and rent textbooks and other academic materials. It provides an easy way to get textbooks at affordable prices, whether they are new, used, or rented.</p>
                <div className="share-icons">
                  <button className="share-btn">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="share-btn">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="share-btn">
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                  <button className="share-btn">
                    <i className="fas fa-link"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div 
              className={`faq-item ${expandedFaq === 'general-2' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('general-2')}
            >
              <div className="faq-question">
                <h3>How do I sell my textbooks on BooKaro?</h3>
                <span className="expand-icon">{expandedFaq === 'general-2' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>To sell your textbooks on BooKaro, simply create an account, list your books with details like condition (new/second-hand), price, and images. Once your listing is approved, students can browse and purchase your textbooks.</p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div 
              className={`faq-item ${expandedFaq === 'general-3' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('general-3')}
            >
              <div className="faq-question">
                <h3>How do I rent books from BooKaro?</h3>
                <span className="expand-icon">{expandedFaq === 'general-3' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>Renting a book on BooKaro is simple. Just browse the available books, check their rental terms, and make your payment. The platform supports various rental periods, and you can choose based on your course needs.</p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div 
              className={`faq-item ${expandedFaq === 'general-4' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('general-4')}
            >
              <div className="faq-question">
                <h3>What payment options are available on BooKaro?</h3>
                <span className="expand-icon">{expandedFaq === 'general-4' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>BooKaro supports multiple payment options, including credit/debit cards, UPI, and wallets. It also offers flexible installment options for rentals, making it easier for students to manage their payments.</p>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div 
              className={`faq-item ${expandedFaq === 'general-5' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('general-5')}
            >
              <div className="faq-question">
                <h3>How do I know if a book is available?</h3>
                <span className="expand-icon">{expandedFaq === 'general-5' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>BooKaro offers real-time inventory updates. When you search for a book, the availability status is displayed. If a book is out of stock, you can choose to be notified when it becomes available again.</p>
              </div>
            </div>

            {/* FAQ Item 6 */}
            <div 
              className={`faq-item ${expandedFaq === 'general-6' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('general-6')}
            >
              <div className="faq-question">
                <h3>Is BooKaro only for VJTI students?</h3>
                <span className="expand-icon">{expandedFaq === 'general-6' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>Yes, BooKaro is designed exclusively for VJTI students. We prioritize the needs of our college community to provide affordable textbooks and educational materials for the students.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Setting up FAQs Content */}
        <div className={`faq-content ${activeTab !== 'setup' ? 'hidden' : ''}`} id="setup-faqs">
          <div className="faq-items">
            {/* Setup FAQ Item 1 */}
            <div 
              className={`faq-item ${expandedFaq === 'setup-1' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('setup-1')}
            >
              <div className="faq-question">
                <h3>How do I add a new question & answer?</h3>
                <span className="expand-icon">{expandedFaq === 'setup-1' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>To add a new FAQ follow these steps:</p>
                <ol>
                  <li>Manage FAQs from your site dashboard or in the Editor</li>
                  <li>Add a new question & answer</li>
                  <li>Assign your FAQ to a category</li>
                  <li>Save and publish.</li>
                </ol>
                <p>You can always come back and edit your FAQs.</p>
              </div>
            </div>

            {/* Setup FAQ Item 2 */}
            <div 
              className={`faq-item ${expandedFaq === 'setup-2' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('setup-2')}
            >
              <div className="faq-question">
                <h3>Can I insert an image, video, or GIF in my FAQ?</h3>
                <span className="expand-icon">{expandedFaq === 'setup-2' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>Yes, you can add media to your FAQs to make them more engaging and informative. When editing your FAQ, use the media toolbar to upload or insert images, videos, or GIFs to illustrate your answer.</p>
              </div>
            </div>

            {/* Setup FAQ Item 3 */}
            <div 
              className={`faq-item ${expandedFaq === 'setup-3' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('setup-3')}
            >
              <div className="faq-question">
                <h3>How do I edit or remove the 'Frequently Asked Questions' title?</h3>
                <span className="expand-icon">{expandedFaq === 'setup-3' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>To edit or remove the FAQ section title:</p>
                <ol>
                  <li>Go to your site's Editor</li>
                  <li>Navigate to the FAQ section</li>
                  <li>Click on the title text to edit or delete it</li>
                  <li>Save your changes</li>
                </ol>
              </div>
            </div>

            {/* Setup FAQ Item 4 */}
            <div 
              className={`faq-item ${expandedFaq === 'setup-4' ? 'expanded' : ''}`}
              onClick={() => toggleFaq('setup-4')}
            >
              <div className="faq-question">
                <h3>How do I organize FAQs into categories?</h3>
                <span className="expand-icon">{expandedFaq === 'setup-4' ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>You can organize your FAQs into categories for better user experience:</p>
                <ol>
                  <li>Go to the FAQ manager in your dashboard</li>
                  <li>Create categories (e.g., General, Payments, Returns)</li>
                  <li>Assign each FAQ to a specific category</li>
                  <li>Arrange the order of categories and FAQs by dragging and dropping</li>
                  <li>Save your changes</li>
                </ol>
              </div>
            </div>
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
            <h2 className="blog-card-title">Student Success Stories</h2>
            <p className="blog-card-description">
              Share your feature information here to attract new clients. Provide a brief summary to help
              visitors understand the context and background, and add details about what ...
            </p>
            <button className="show-more-btn">Show More</button>
          </div>

          <div className="blog-card">
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
        /* CSS styles remain unchanged */
        .faq-section {
          padding: 60px 20px;
          max-width: 1000px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .faq-main-title {
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
          color: #333;
        }

        .faq-search {
          display: flex;
          margin: 0 auto 30px;
          max-width: 600px;
        }

        .search-input {
          flex: 1;
          padding: 12px 16px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          outline: none;
        }

        .search-button {
          padding: 12px 24px;
          background-color: rgb(207, 126, 82);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .search-button:hover {
          background-color: rgba(207, 126, 82, 0.8);
        }

        .faq-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #ddd;
        }

        .tab {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          color: #666;
          transition: color 0.3s;
        }

        .tab.active {
          color: rgb(207, 126, 82);
          font-weight: 600;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: rgb(207, 126, 82);
        }

        .faq-content {
          margin-top: 20px;
        }

        .faq-content.hidden {
          display: none;
        }

        .faq-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: box-shadow 0.3s;
        }

        .faq-item:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: #f9fafb;
        }

        .faq-question h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .expand-icon {
          font-size: 24px;
          color: rgb(207, 126, 82);
          font-weight: 300;
        }

        .faq-answer {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, padding 0.3s ease;
        }

        .faq-item.expanded .faq-answer {
          padding: 20px;
          max-height: 500px;
          transition: max-height 0.5s ease-in, padding 0.3s ease;
        }

        .faq-answer p {
          margin: 0 0 16px;
          color: #4b5563;
          line-height: 1.6;
        }

        .faq-answer ol {
          margin: 0 0 16px 20px;
          color: #4b5563;
          line-height: 1.6;
        }

        .faq-answer li {
          margin-bottom: 8px;
        }

        .share-icons {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .share-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f3f4f6;
          border: none;
          color: #4b5563;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .share-btn:hover {
          background-color: rgb(207, 126, 82);
          color: white;
        }

        @media (max-width: 768px) {
          .faq-main-title {
            font-size: 28px;
          }
          
          .faq-question h3 {
            font-size: 16px;
          }
          
          .tab {
            padding: 10px 16px;
            font-size: 14px;
          }
        }
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