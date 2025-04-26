import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, MessageSquare, Menu, X } from 'lucide-react';
import './aboutus.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import dikshaImage from './diksha.jpg';
import prachiImage from './prachi.jpg'
import mahimaImg from './mahima.jpeg'// Updated image paths to reference images in the same folder as aboutus.jsx
const teamMembers = [
  {
    name: 'Prachi Shende',
    role: 'Frontend Developer',
    bio: 'Building the interface for your next chapter—both in code and in textbooks!',
    imgUrl: prachiImage, // Updated path
    github: 'https://github.com/Prachi-Shende',
    linkedin: 'https://www.linkedin.com/in/prachi-shende-8911b6298/'
  },
  {
    name: 'Shreya Rajeev',
    role: 'Backend Developer',
    bio: 'Works tirelessly to provide innovative solutions for VJTI students.',
    imgUrl: './priya.jpg', // Updated path
    github: 'https://github.com/ShreyaR2',
    linkedin: 'https://www.linkedin.com/in/shreya-r-144922297/'
  },
  {
    name: 'Mahima Sonawane',
    role: 'Frontend Developer',
    bio: 'Designing your study breaks, one pixel at a time!',
    imgUrl: mahimaImg, // Updated path
    github: 'https://github.com/Mahi3454',
    linkedin: 'https://www.linkedin.com/in/mahima-sonawane-829491309/'
  },
  {
    name: 'Diksha Thongire',
    role: 'Backend Developer',
    bio: 'Working tirelessly so students can have better CGPA and a healthier sleep schedule!',
    imgUrl: dikshaImage, 
    github: 'https://github.com/dikshat25',
    linkedin: 'https://www.linkedin.com/in/diksha-thongire-88a51728a/'
  },
];

const BooKaroAboutUsPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div className="about-page">
      {/* Navigation Bar */}
      <Header />

      {/* About Us Title Section */}
      <div className="about-title-section">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          Learn more about BooKaro and our mission to simplify book shopping for VJTI students.
        </p>
      </div>

      {/* Our Purpose and Vision Section */}
      <section className="purpose-section">
        <div className="container">
          <div className="icon-wrapper">
            <div className="icon-circle">
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
          </div>
          <h1 className="section-title1">Our Purpose and Vision</h1>
          <div className="section-content">
            <p>
              BooKaro is dedicated to providing a platform for VJTI students to seamlessly buy, sell, and rent books. Our 
              goal is to facilitate easy connections among students and seniors for book transactions at the best prices 
              possible.
            </p>
            <p>
              We aim to create a sustainable ecosystem where books can be reused and recycled within the VJTI community, 
              reducing waste and making education more affordable for all students.
            </p>
            <button className="btn-primary">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title1">Meet Our Team</h2>
          <p className="section-description">
            Our team at BooKaro is committed to ensuring a smooth and user-friendly experience for VJTI students. We are here to assist you with all your book-related needs and queries.
          </p>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                {member.imgUrl ? (
                  <img src={member.imgUrl} alt={member.name} className="team-avatar" />
                ) : (
                  <div className="team-avatar">
                    {member.name.charAt(0)}
                  </div>
                )}
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
                <div className="team-socials">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaGithub />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ))}
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
        
        /* Team Section */
        .team-section {
          background-color: #f5efef;
          padding: 4rem 1rem;
        }
        
        .section-description {
          text-align: center;
          max-width: 48rem;
          margin: 0 auto 3rem;
          color: #6b7280;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
          gap: 2rem;
          max-width: 72rem;
          margin: 0 auto;
        }
        
        .team-card {
          background-color: white;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          padding: 1.5rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .team-card:hover {
          transform: translateY(-0.3125rem);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        
        .team-avatar {
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          background-color: rgb(207, 126, 82);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.75rem;
          margin: 0 auto 1rem;
          object-fit: cover;
        }
        
        .team-name {
          font-weight: 600;
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
          color: #1f2937;
        }
        
        .team-role {
          color: rgb(207, 126, 82);
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        
        .team-bio {
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        
        .team-socials {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .team-socials .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: #f3f4f6;
          color: rgb(207, 126, 82);
          transition: all 0.3s ease;
        }
        
        .team-socials .social-link:hover {
          background-color: rgb(207, 126, 82);
          color: white;
          transform: translateY(-2px);
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

export default BooKaroAboutUsPage;