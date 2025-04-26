import React, { useState, useRef } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Camera, Edit, LogOut, ChevronRight, Bell, ShoppingBag, MessageSquare, Heart, Star, BookOpen, HelpCircle, User } from 'lucide-react';
import './profile.css';

const MyProfile = () => {
  const fileInputRef = useRef(null);
  
  // State for user information
  const [user, setUser] = useState({
    name: 'Jane Smith',
    email: 'janesmith@university.edu',
    phone: '+1 (555) 123-4567',
    enrollmentId: 'UNI2023045',
    role: 'both', // 'buyer', 'seller', or 'both'
    profilePic: '/api/placeholder/150/150', // Placeholder image
    notifications: [
      { id: 1, message: 'New message from John about "Calculus Made Easy"', read: false, time: '2 hours ago' },
      { id: 2, message: 'Price dropped for "Database Systems" in your wishlist', read: false, time: '1 day ago' },
      { id: 3, message: 'Your listing "Physics 101" has a new interested buyer', read: true, time: '3 days ago' }
    ]
  });

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data for listings
  const [listings, setListings] = useState([
    { id: 1, title: 'Data Structures and Algorithms', author: 'Thomas Cormen', price: '$25', status: 'Available', image: '/api/placeholder/80/100' },
    { id: 2, title: 'Physics 101', author: 'Richard Feynman', price: '$18', status: 'Sold', image: '/api/placeholder/80/100' },
    { id: 3, title: 'Introduction to Psychology', author: 'David Myers', price: '$20', status: 'Rented', image: '/api/placeholder/80/100' }
  ]);

  // Mock data for purchases
  const [purchases, setPurchases] = useState([
    { id: 1, title: 'Operating Systems', author: 'Andrew Tanenbaum', price: '$30', status: 'Completed', date: '2025-01-15', image: '/api/placeholder/80/100' },
    { id: 2, title: 'Organic Chemistry', author: 'Paula Bruice', price: '$22', status: 'Pending', date: '2025-04-10', image: '/api/placeholder/80/100' }
  ]);

  // Mock data for wishlist
  const [wishlist, setWishlist] = useState([
    { id: 1, title: 'Database Systems', author: 'Abraham Silberschatz', price: '$28', image: '/api/placeholder/80/100' },
    { id: 2, title: 'Computer Networks', author: 'Andrew Tanenbaum', price: '$32', image: '/api/placeholder/80/100' }
  ]);

  // Mock data for reviews
  const [reviews, setReviews] = useState([
    { id: 1, from: 'Alex Johnson', rating: 5, comment: 'Great seller! Book was in excellent condition as described.', date: '2025-03-12' },
    { id: 2, from: 'Taylor Wilson', rating: 4, comment: 'Quick response and smooth transaction.', date: '2025-02-22' }
  ]);

  // Mock data for messages
  const [messages, setMessages] = useState([
    { id: 1, from: 'John Doe', subject: 'About Calculus Made Easy', preview: 'Is this book still available?', unread: true, date: '2025-04-20' },
    { id: 2, from: 'Mary Johnson', subject: 'Physics 101 Textbook', preview: 'Thank you for the quick delivery!', unread: false, date: '2025-04-15' },
    { id: 3, from: 'Robert Lee', subject: 'Introduction to Psychology', preview: 'Could you tell me about the condition of the book?', unread: true, date: '2025-04-14' }
  ]);

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Delete a listing
  const deleteListing = (id) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setUser({
      ...user,
      notifications: user.notifications.map(notification => 
        notification.id === id ? {...notification, read: true} : notification
      )
    });
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setUser({
      ...user,
      notifications: user.notifications.map(notification => ({...notification, read: true}))
    });
  };

  // Handle edit form changes
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Save profile changes
  const saveProfileChanges = () => {
    setUser({ ...user, name: editForm.name, email: editForm.email, phone: editForm.phone });
    setIsEditing(false);
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className={`profile-info ${isEditing ? 'editing' : ''}`}>
            {!isEditing ? (
              <div className="info-section">
                <div className="section-header">
                  <h3>Basic Information</h3>
                  <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                    <Edit size={16} /> Edit Profile
                  </button>
                </div>
                <div className="info-card">
                  <div className="info-row">
                    <div className="info-label">Name:</div>
                    <div className="info-value">{user.name}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Email:</div>
                    <div className="info-value">{user.email}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Phone:</div>
                    <div className="info-value">{user.phone}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Enrollment ID:</div>
                    <div className="info-value">{user.enrollmentId}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">User Role:</div>
                    <div className="info-value info-role">
                      <span className={`role-badge ${user.role === 'buyer' || user.role === 'both' ? 'active' : ''}`}>Buyer</span>
                      <span className={`role-badge ${user.role === 'seller' || user.role === 'both' ? 'active' : ''}`}>Seller</span>
                    </div>
                  </div>
                </div>
                
                <div className="account-actions">
                  <h3>Account Settings</h3>
                  <div className="action-buttons">
                    <button className="account-btn">
                      <span>Change Password</span>
                      <ChevronRight size={16} />
                    </button>
                    <button className="account-btn">
                      <span>Manage Payment Methods</span>
                      <ChevronRight size={16} />
                    </button>
                    <button className="account-btn">
                      <span>Notification Preferences</span>
                      <ChevronRight size={16} />
                    </button>
                    <button className="account-btn logout">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="edit-profile-form">
                <div className="section-header">
                  <h3>Edit Profile</h3>
                  <div className="form-actions">
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="save-btn" onClick={saveProfileChanges}>Save Changes</button>
                  </div>
                </div>
                <div className="info-card">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditFormChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditFormChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input 
                      type="text" 
                      id="phone"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditFormChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'listings':
        return (
          <div className="listings-section">
            <div className="section-header">
              <h3>My Listings</h3>
              <button className="add-new-btn">+ Add New Listing</button>
            </div>
            
            {listings.length > 0 ? (
              <div className="listings-grid">
                {listings.map(listing => (
                  <div key={listing.id} className="listing-card">
                    <div className="listing-image">
                      <img src={listing.image} alt={listing.title} />
                      <span className={`listing-status ${listing.status.toLowerCase()}`}>{listing.status}</span>
                    </div>
                    <div className="listing-details">
                      <h4>{listing.title}</h4>
                      <p className="listing-author">by {listing.author}</p>
                      <p className="listing-price">{listing.price}</p>
                      <div className="listing-actions">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn" onClick={() => deleteListing(listing.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><BookOpen size={48} /></div>
                <p>You don't have any listings yet.</p>
                <button className="add-new-btn">Create Your First Listing</button>
              </div>
            )}
          </div>
        );
      
      case 'purchases':
        return (
          <div className="purchases-section">
            <h3>My Purchases & Rentals</h3>
            
            {purchases.length > 0 ? (
              <div className="purchases-list">
                {purchases.map(purchase => (
                  <div key={purchase.id} className="purchase-card">
                    <div className="purchase-image">
                      <img src={purchase.image} alt={purchase.title} />
                    </div>
                    <div className="purchase-details">
                      <h4>{purchase.title}</h4>
                      <p className="purchase-author">by {purchase.author}</p>
                      <p className="purchase-price">{purchase.price}</p>
                      <p className="purchase-date">Purchased: {purchase.date}</p>
                      <span className={`purchase-status ${purchase.status.toLowerCase()}`}>{purchase.status}</span>
                    </div>
                    <div className="purchase-actions">
                      <button className="view-order-btn">View Details</button>
                      <button className="download-invoice-btn">Download Invoice</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><ShoppingBag size={48} /></div>
                <p>You haven't made any purchases yet.</p>
                <button className="browse-books-btn">Browse Books</button>
              </div>
            )}
          </div>
        );
      
      case 'messages':
        return (
          <div className="messages-section">
            <h3>My Messages</h3>
            
            {messages.length > 0 ? (
              <div className="messages-list">
                {messages.map(message => (
                  <div key={message.id} className={`message-card ${message.unread ? 'unread' : ''}`}>
                    <div className="message-header">
                      <div className="message-from">{message.from}</div>
                      <div className="message-date">{message.date}</div>
                    </div>
                    <div className="message-subject">{message.subject}</div>
                    <div className="message-preview">{message.preview}</div>
                    <div className="message-actions">
                      <button className="reply-btn">Reply</button>
                      <button className="view-btn">View</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><MessageSquare size={48} /></div>
                <p>You don't have any messages yet.</p>
              </div>
            )}
          </div>
        );
      
      case 'reviews':
        return (
          <div className="reviews-section">
            <h3>My Ratings & Reviews</h3>
            
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer">{review.from}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`star ${i < review.rating ? 'filled' : ''}`} size={18} />
                      ))}
                    </div>
                    <div className="review-comment">"{review.comment}"</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><Star size={48} /></div>
                <p>You don't have any reviews yet.</p>
              </div>
            )}
            
            <div className="given-reviews">
              <h4>Reviews You've Given</h4>
              <button className="write-review-btn">Write a Review</button>
              <p className="no-reviews">You haven't written any reviews yet.</p>
            </div>
          </div>
        );
      
      case 'wishlist':
        return (
          <div className="wishlist-section">
            <h3>My Wishlist</h3>
            
            {wishlist.length > 0 ? (
              <div className="wishlist-grid">
                {wishlist.map(item => (
                  <div key={item.id} className="wishlist-card">
                    <div className="wishlist-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="wishlist-details">
                      <h4>{item.title}</h4>
                      <p className="wishlist-author">by {item.author}</p>
                      <p className="wishlist-price">{item.price}</p>
                      <div className="wishlist-actions">
                        <button className="add-to-cart-btn">Add to Cart</button>
                        <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><Heart size={48} /></div>
                <p>Your wishlist is empty.</p>
                <button className="browse-books-btn">Browse Books</button>
              </div>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div className="notifications-section">
            <div className="notifications-header">
              <h3>My Notifications</h3>
              {user.notifications.some(n => !n.read) && (
                <button className="mark-all-btn" onClick={markAllAsRead}>Mark All as Read</button>
              )}
            </div>
            
            {user.notifications.length > 0 ? (
              <div className="notifications-list">
                {user.notifications.map(notification => (
                  <div key={notification.id} className={`notification-card ${!notification.read ? 'unread' : ''}`}>
                    <div className="notification-content">
                      {!notification.read && <span className="unread-dot"></span>}
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    <div className="notification-actions">
                      {!notification.read && (
                        <button className="mark-read-btn" onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><Bell size={48} /></div>
                <p>You don't have any notifications.</p>
              </div>
            )}
          </div>
        );

      case 'support':
        return (
          <div className="support-section">
            <h3>Help & Support</h3>
            
            <div className="faq-section">
              <h4>Frequently Asked Questions</h4>
              <div className="accordion">
                <div className="accordion-item">
                  <button className="accordion-header">
                    <span>How do I list a book for sale?</span>
                    <ChevronRight size={18} className="accordion-icon" />
                  </button>
                  <div className="accordion-content">
                    Navigate to "My Listings" tab and click on "Add New Listing" button. Fill in the required details about your book and submit the form.
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-header">
                    <span>How do I contact a seller?</span>
                    <ChevronRight size={18} className="accordion-icon" />
                  </button>
                  <div className="accordion-content">
                    On any book listing page, click the "Contact Seller" button to send them a message.
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-header">
                    <span>What payment methods are accepted?</span>
                    <ChevronRight size={18} className="accordion-icon" />
                  </button>
                  <div className="accordion-content">
                    We currently support credit/debit cards, campus cash, and in-person cash payments.
                  </div>
                </div>
              </div>
              <button className="view-all-faqs">View All FAQs</button>
            </div>
            
            <div className="contact-support">
              <h4>Contact Support</h4>
              <div className="report-issue">
                <h5>Report an Issue</h5>
                <form className="support-form">
                  <div className="form-group">
                    <label htmlFor="issueType">Issue Type</label>
                    <select id="issueType" className="form-select">
                      <option value="">Select an issue type</option>
                      <option value="technical">Technical Problem</option>
                      <option value="payment">Payment Issue</option>
                      <option value="seller">Problem with Seller</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="issueDescription">Issue Description</label>
                    <textarea id="issueDescription" className="form-textarea" rows="4" placeholder="Please describe your issue in detail"></textarea>
                  </div>
                  <button type="submit" className="submit-issue-btn">Submit</button>
                </form>
              </div>
              
              <div className="contact-info">
                <h5>Contact Information</h5>
                <p>Email: support@campusbookstore.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Hours: Monday-Friday, 9am-5pm</p>
              </div>
            </div>
          </div>
        );
          
      default:
        return null;
    }
  };

  const unreadNotificationsCount = user.notifications.filter(notification => !notification.read).length;
  const unreadMessagesCount = messages.filter(message => message.unread).length;

  const navItems = [
    { id: 'profile', label: 'My Profile', icon: <User size={20} />, count: null },
    { id: 'listings', label: 'My Listings', icon: <BookOpen size={20} />, count: listings.length },
    { id: 'purchases', label: 'My Purchases', icon: <ShoppingBag size={20} />, count: purchases.length },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} />, count: unreadMessagesCount, isAlert: unreadMessagesCount > 0 },
    { id: 'reviews', label: 'Ratings & Reviews', icon: <Star size={20} />, count: null },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={20} />, count: wishlist.length },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, count: unreadNotificationsCount, isAlert: unreadNotificationsCount > 0 },
    { id: 'support', label: 'Help & Support', icon: <HelpCircle size={20} />, count: null }
  ];

  return (
    <div className="app-container">
      <Header />
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-banner"></div>
          <div className="profile-header-content">
            <div className="profile-pic-container">
              <img src={user.profilePic} alt="Profile" className="profile-pic" />
              <button className="change-pic-btn" onClick={triggerFileInput}>
                <Camera size={16} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleProfileImageChange}
              />
            </div>
            <div className="profile-name-info">
              <h2>{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              <div className="profile-role">
                <span className={`role-badge ${user.role === 'buyer' || user.role === 'both' ? 'active' : ''}`}>Buyer</span>
                <span className={`role-badge ${user.role === 'seller' || user.role === 'both' ? 'active' : ''}`}>Seller</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <ul className="profile-nav">
              {navItems.map(item => (
                <li 
                  key={item.id}
                  className={activeTab === item.id ? 'active' : ''} 
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                  {item.count !== null && (
                    <span className={`nav-count ${item.isAlert ? 'alert' : ''}`}>{item.count}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-main-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyProfile;