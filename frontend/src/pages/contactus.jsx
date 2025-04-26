import React, { useState } from 'react';
import './contactus.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const ConnectWithUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    setFormSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="connect-page">
      <Header />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1>Connect With Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </div>

      <div className="content-container">
        <div className="contact-grid">
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            
            {formSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Thank you for contacting us!</h3>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="yourname@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="message-input"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Submit Message</button>
              </form>
            )}
          </div>
          
          <div className="contact-info-section">
            <div className="contact-card">
              <h3>Contact Information</h3>
              <p>Have questions or want to schedule a visit? Reach out to us using any of the following methods.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <MapPin size={20} className="contact-icon" />
                  <div>
                    <h4>Our Location</h4>
                    <p>Veermata Jijabai Technological Institute<br />
                    H R Mahajani Road, Near Five Garden,<br />
                    Matunga Road, Mumbai, Maharashtra 400019</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Mail size={20} className="contact-icon" />
                  <div>
                    <h4>Email Us</h4>
                    <p>contact@vjti.edu.in</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Phone size={20} className="contact-icon" />
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 22 2419 8101</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Clock size={20} className="contact-icon" />
                  <div>
                    <h4>Office Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9499543456854!2d72.85396547497771!3d19.022945982199816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf26f4972d21%3A0x2c50185364aca4c1!2sVeermata%20Jijabai%20Technological%20Institute!5e0!3m2!1sen!2sin!4v1716456797001!5m2!1sen!2sin" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="VJTI Location Map"
              ></iframe>
            </div>
          </div>
        </div>          
      </div>
      <Footer />
    </div>
  );
};

export default ConnectWithUs;