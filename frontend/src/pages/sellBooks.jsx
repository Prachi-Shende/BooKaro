import React, { useState, useEffect } from 'react'
import { Book, DollarSign, Calendar, Tag, MessageSquare } from 'lucide-react';
import Header from '../components/header'; // Assuming these are in the correct relative paths
import Footer from '../components/footer'; // Assuming these are in the correct relative paths
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Corrected import
import { app } from '../firebase/config'; // Import initialized Firebase app
;  // <-- notice we import useEffect also


const SellBooksPage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission
  const firestore = getFirestore(app); // Initialize Firestore
  const [stream, setStream] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    // Check for required fields before proceeding.
    if (!bookTitle || !author || !category || !condition || !price || !description) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 2. Prepare the data object to send to Firestore
      const bookData = {
        bookTitle,
        author,
        isbn,
        category,
        condition,
        price: Number(price), // Ensure price is a number
        description,
        createdAt: serverTimestamp(), // Use serverTimestamp()
        userId: 'some-user-id', // Add current user ID if needed.  You'll need to get this from your auth system.
      };

      // 3. Add book data to Firestore under the "books" collection
      const docRef = await addDoc(collection(firestore, 'books'), bookData);
      console.log("Document written with ID: ", docRef.id);

      alert("Your book has been listed successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error listing your book. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
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
  };
  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      const video = document.getElementById('webcam-video');
      if (video) {
        video.srcObject = null;
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:5000/detect/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.summary) {
        setCondition(data.summary);
      } else {
        alert('Failed to detect condition from image.');
      }
    } catch (error) {
      console.error(error);
      alert('Error during detection.');
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const videoUrl = URL.createObjectURL(file);
    setUploadedVideo(videoUrl);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:5000/detect/video', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.summary) {
        setCondition(data.summary);
      } else {
        alert('Failed to detect condition from video.');
      }
    } catch (error) {
      console.error(error);
      alert('Error during detection.');
    }
  };

  const handleWebcamCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, frameRate: { ideal: 30, max: 60 } }, // Higher fps
        audio: false
      });
      setStream(mediaStream);

      const video = document.getElementById('webcam-video');
      if (video) {
        video.srcObject = mediaStream;
        video.play();
      }

      // ⚡ IMPORTANT: Don't call Flask immediately
      // Let user capture a snapshot later manually if needed!
    } catch (error) {
      console.error(error);
      alert('Error accessing webcam.');
    }
  };
  const captureSnapshot = async () => {
    const video = document.getElementById('webcam-video');
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append('file', blob, 'snapshot.jpg');

      try {
        const res = await fetch('http://127.0.0.1:5000/detect/image', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.summary) {
          setCondition(data.summary);
        } else {
          alert('Failed to detect condition from webcam snapshot.');
        }
      } catch (error) {
        console.error(error);
        alert('Error during snapshot detection.');
      }
    }, 'image/jpeg');
  };
  const generateRandomPrice = () => {
    const randomPrice = Math.floor(Math.random() * (500 - 250 + 1)) + 250; // Random number between 250 and 500
    setPrice(randomPrice); // Set the price to the generated value
  };

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, frameRate: { ideal: 30, max: 60 } },
          audio: false
        });
        setStream(mediaStream);

        const video = document.getElementById('webcam-video');
        if (video) {
          video.srcObject = mediaStream;
          video.play();
        }
      } catch (error) {
        console.error('Error starting webcam:', error);
      }
    };

    startWebcam();

    // Cleanup when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);


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
              <p className="step-description">Fill in the details about your book and set your price.</p>
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
              </div>

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

              <div className="form-group full-width">
                <label className="form-label">Check Book Condition <span className="required">*</span></label>

                <div className="upload-container">
                  {/* Upload Image */}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  <button type="button" className="upload-button" onClick={() => document.getElementById('image-upload').click()}>
                    Upload Image
                  </button>

                  {/* Upload Video */}
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    style={{ display: 'none' }}
                    onChange={handleVideoUpload}
                  />
                  <button type="button" className="upload-button" onClick={() => document.getElementById('video-upload').click()}>
                    Upload Video
                  </button>

                  {/* Capture Webcam */}
                  <button type="button" className="upload-button" onClick={handleWebcamCapture}>
                    Capture from Webcam
                  </button>

                  {/* Show Detected Condition */}
                  {condition && (
                    <div style={{ marginTop: "10px" }}>
                      <strong>Detected Condition:</strong> {condition}
                    </div>
                  )}
                </div>
                {stream && (
                  <div style={{ marginTop: "20px" }}>
                    <video id="webcam-video" width="400" height="300" autoPlay muted style={{ borderRadius: '8px' }} />
                    <div style={{ marginTop: "10px" }}>
                      <button type="button" onClick={stopWebcam} className="cancel-button">
                        Stop Webcam
                      </button>
                    </div>
                  </div>
                )}

                {uploadedImage && (
                  <div style={{ marginTop: "10px" }}>
                    <h4>Uploaded Image Preview:</h4>
                    <img src={uploadedImage} alt="Uploaded" style={{ width: '300px', height: 'auto', borderRadius: '8px' }} />
                  </div>
                )}
                {uploadedVideo && (
                  <div style={{ marginTop: "10px" }}>
                    <h4>Uploaded Video Preview:</h4>
                    <video src={uploadedVideo} controls width="400" height="300" />
                  </div>
                )}
                <div style={{ marginTop: "10px" }}>
                  <button type="button" onClick={captureSnapshot} className="upload-button">
                    Capture Photo & Detect
                  </button>
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
                  {/* Add the button to generate dynamic price */}
                  <button
                    type="button"
                    className="generate-price-button"
                    onClick={generateRandomPrice}
                  >
                    Dynamic Pricing
                  </button>
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

                {/* Form Actions */}
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={resetForm} disabled={isSubmitting}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Listing...' : 'List My Book'}
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
      </section>{/* Condition */}


      {/* Footer */}
      <Footer />
      <style jsx>{`
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
          color : white ;
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
          transform: translateY(-2px);
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
