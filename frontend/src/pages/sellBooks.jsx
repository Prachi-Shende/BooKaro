import React, { useState } from 'react';
import { Upload, Book, DollarSign, Calendar, Tag, MessageSquare } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';

const SellBooksPage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  
  // Handle file upload for book images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    
    // Create URL previews for the images
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };
  
  // Remove image from preview
  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];
    
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      bookTitle,
      author,
      isbn,
      category,
      condition,
      price,
      description,
      images
    });
    
    // Reset form after submission (in a real app, you might want to show a success message)
    alert("Your book has been listed successfully!");
    resetForm();
  };
  
  // Reset form fields
  const resetForm = () => {
    setBookTitle('');
    setAuthor('');
    setIsbn('');
    setCategory('');
    setCondition('');
    setPrice('');
    setDescription('');
    setImages([]);
    setPreviewImages([]);
  };

  return (
    <div className="app-container">
      {/* Header Component */}
      <Header />
      
      {/* Hero Section */}
      <div className="sell-hero-section">
        <div className="sell-hero-overlay">
          <h1 className="sell-hero-title">Sell Your Books with Ease</h1>
          <p className="sell-hero-description">
            Turn your unused books into cash. List your books in minutes and connect with VJTI students looking for affordable textbooks.
          </p>
        </div>
      </div>
      
      {/* Sell Books Process */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">
                <Book />
              </div>
              <h3 className="step-title">List Your Book</h3>
              <p className="step-description">Fill in the details about your book, upload photos, and set your price.</p>
            </div>
            
            <div className="process-step">
              <div className="step-icon">
                <MessageSquare />
              </div>
              <h3 className="step-title">Connect with Buyers</h3>
              <p className="step-description">Receive messages from interested buyers and negotiate directly.</p>
            </div>
            
            <div className="process-step">
              <div className="step-icon">
                <DollarSign />
              </div>
              <h3 className="step-title">Get Paid</h3>
              <p className="step-description">Meet on campus for the exchange or use our secure payment system.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Listing Form */}
      <section className="listing-section">
        <div className="container">
          <div className="listing-form-container">
            <h2 className="listing-form-title">List Your Book</h2>
            
            <form className="listing-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Book Title */}
                <div className="form-group">
                  <label className="form-label">Book Title <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter book title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                  />
                </div>
                
                {/* Author */}
                <div className="form-group">
                  <label className="form-label">Author <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter author name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>
                
                {/* ISBN */}
                <div className="form-group">
                  <label className="form-label">ISBN (Optional)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter ISBN number"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </div>
                
                {/* Category */}
                <div className="form-group">
                  <label className="form-label">Category <span className="required">*</span></label>
                  <select 
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="engineering">Engineering</option>
                    <option value="computer_science">Computer Science</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="electronics">Electronics</option>
                    <option value="mechanical">Mechanical Engineering</option>
                    <option value="civil">Civil Engineering</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                {/* Condition */}
                <div className="form-group">
                  <label className="form-label">Condition <span className="required">*</span></label>
                  <select 
                    className="form-select"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="new">New</option>
                    <option value="like_new">Like New</option>
                    <option value="very_good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="acceptable">Acceptable</option>
                  </select>
                </div>
                
                {/* Price */}
                <div className="form-group">
                  <label className="form-label">Price (₹) <span className="required">*</span></label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="Enter price in rupees"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                
                {/* Description */}
                <div className="form-group full-width">
                  <label className="form-label">Description <span className="required">*</span></label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Describe your book, mention any highlights, markings or damages"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                {/* Image Upload */}
                <div className="form-group full-width">
                  <label className="form-label">Upload Images <span className="required">*</span></label>
                  <div className="upload-container">
                    <div className="upload-button">
                      <Upload size={24} />
                      <span>Choose Files</span>
                      <input 
                        type="file" 
                        className="file-input" 
                        onChange={handleImageUpload}
                        multiple
                        accept="image/*"
                      />
                    </div>
                    <p className="upload-help">Upload up to 5 images. First image will be the cover.</p>
                  </div>
                </div>
                
                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="form-group full-width">
                    <div className="image-previews">
                      {previewImages.map((src, index) => (
                        <div key={index} className="image-preview">
                          <img src={src} alt={`Preview ${index + 1}`} />
                          <button 
                            type="button" 
                            className="remove-image" 
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Form Actions */}
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    List My Book
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Why Sell Section */}
      <section className="why-sell-section">
        <div className="container">
          <h2 className="section-title">Why Sell on BooKaro?</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Tag />
              </div>
              <h3 className="benefit-title">Zero Listing Fees</h3>
              <p className="benefit-description">List your books completely free. We only take a small commission when your book sells.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <Calendar />
              </div>
              <h3 className="benefit-title">Quick Turnaround</h3>
              <p className="benefit-description">Connect with local VJTI students for faster sales and no shipping hassles.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <Book />
              </div>
              <h3 className="benefit-title">Sustainable Choice</h3>
              <p className="benefit-description">Give your books a second life and help other students save money on textbooks.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Seller Success Stories</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"I sold all my previous semester books within a week! The platform is super easy to use and connecting with buyers was seamless."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">AR</div>
                <div className="author-info">
                  <h4>Aditya Rane</h4>
                  <p>Computer Engineering, 3rd Year</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"As a final year student, I had so many books I no longer needed. BooKaro helped me earn back almost 60% of what I originally paid!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div className="author-info">
                  <h4>Sneha Mehta</h4>
                  <p>Electronics Engineering, 4th Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">How much can I earn selling my books?</h3>
              <p className="faq-answer">You set your own prices! Most sellers earn between 40-70% of the original price depending on the book's condition and demand.</p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">How do I receive payment?</h3>
              <p className="faq-answer">You can choose between in-person cash exchange or our secure online payment system that transfers directly to your bank account.</p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">How long does it take to sell a book?</h3>
              <p className="faq-answer">Popular textbooks typically sell within 1-2 weeks. The beginning of semesters is the busiest time with fastest sales.</p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">Can I edit my listing after posting?</h3>
              <p className="faq-answer">Yes! You can edit details, change prices, or remove listings at any time through your seller dashboard.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Turn Your Books into Cash?</h2>
            <p className="cta-description">Start selling today and help fellow students access affordable textbooks.</p>
            <button className="cta-button">List Your First Book</button>
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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #333;
          line-height: 1.6;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }
        
        .section-title {
          font-size: 30px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 24px;
          color: #333;
        }
        
        @media (min-width: 768px) {
          .section-title {
            font-size: 36px;
            margin-bottom: 32px;
          }
        }
        
        .required {
          color: #e53e3e;
        }
        
        /* Hero Section */
        .sell-hero-section {
          position: relative;
          height: 300px;
          background-image: url('https://www.swissinfo.ch/content/wp-content/uploads/sites/13/2025/02/csm_UBH_Freihandmagazin_Lesenische_Mark_Niedermann_a5dfe81c15.jpg?ver=4cd2909c');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          margin-bottom: 48px;
        }
        
        .sell-hero-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }
        
        .sell-hero-overlay {
          position: relative;
          z-index: 2;
          padding: 0 16px;
          max-width: 800px;
        }
        
        .sell-hero-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        
        .sell-hero-description {
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto;
        }
        
        @media (min-width: 768px) {
          .sell-hero-title {
            font-size: 48px;
          }
        }
        
        /* Process Section */
        .process-section {
          padding: 48px 0;
          background-color: #fbfbfb;
          margin-bottom: 48px;
        }
        
        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        @media (min-width: 768px) {
          .process-steps {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        
        .process-step {
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          flex: 1;
          transition: transform 0.3s;
        }
        
        .process-step:hover {
          transform: translateY(-5px);
        }
        
        .step-icon {
          width: 60px;
          height: 60px;
          background-color: rgba(207, 126, 82, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: rgb(207, 126, 82);
        }
        
        .step-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .step-description {
          color: #666;
        }
        
        /* Listing Form */
        .listing-section {
          padding: 48px 0;
        }
        
        .listing-form-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 32px;
        }
        
        .listing-form-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
          text-align: center;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        
        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .full-width {
          grid-column: 1 / -1;
        }
        
        .form-label {
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .form-input,
        .form-select,
        .form-textarea {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgb(207, 126, 82);
          outline: none;
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        /* Upload Container */
        .upload-container {
          margin-bottom: 16px;
        }
        
        .upload-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #f3f4f6;
          padding: 12px 16px;
          border-radius: 4px;
          cursor: pointer;
          border: 1px dashed #ddd;
          position: relative;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .upload-button:hover {
          background-color: #eaeaea;
        }
        
        .file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        
        .upload-help {
          font-size: 14px;
          color: #666;
        }
        
        /* Image Previews */
        .image-previews {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
        }
        
        .image-preview {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .remove-image {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        /* Form Actions */
        .form-actions {
          grid-column: 1 / -1;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 16px;
        }
        
        .cancel-button {
          padding: 10px 20px;
          background-color: transparent;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .cancel-button:hover {
          background-color: #f3f4f6;
        }
        
        .submit-button {
          padding: 10px 24px;
          background-color: rgb(207, 126, 82);
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .submit-button:hover {
          background-color: rgba(207, 126, 82, 0.9);
        }
        
        /* Why Sell Section */
        .why-sell-section {
          padding: 48px 0;
          background-color: #fbfbfb;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        
        @media (min-width: 768px) {
          .benefits-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .benefit-card {
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s;
        }
        
        .benefit-card:hover {
          transform: translateY(-5px);
        }
        
        .benefit-icon {
          width: 60px;
          height: 60px;
          background-color: rgba(207, 126, 82, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: rgb(207, 126, 82);
        }
        
        .benefit-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .benefit-description {
          color: #666;
        }
        
        /* Testimonials */
        .testimonials-section {
          padding: 48px 0;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        @media (min-width: 768px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .testimonial-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .testimonial-content {
          padding: 24px;
          font-style: italic;
          border-bottom: 1px solid #eee;
        }
        
        .testimonial-author {
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgb(207, 126, 82);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        
        .author-info h4 {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .author-info p {
          font-size: 14px;
          color: #666;
        }
        
        /* FAQ Section */
        .faq-section {
          padding: 48px 0;
          background-color: #fbfbfb;
        }
        
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        @media (min-width: 768px) {
          .faq-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .faq-item {
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .faq-question {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          color: rgb(207, 126, 82);
        }
        
        .faq-answer {
          color: #666;
        }
        
        /* CTA Section */
        .cta-section {
          padding: 64px 0;
          background-color: rgb(207, 126, 82);
          color: white;
          text-align: center;
        }
        
        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .cta-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        
        .cta-description {
          margin-bottom: 24px;
          font-size: 18px;
          opacity: 0.9;
        }
        
        .cta-button {
          background-color: white;
          color: rgb(207, 126, 82);
          border: none;
          padding: 12px 32px;
          border-radius: 4px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .cta-button:hover {
          background-color: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default SellBooksPage;