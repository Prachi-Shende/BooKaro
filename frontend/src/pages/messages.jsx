import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './messages.css';

const Messages = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // Mock data
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    role: 'buyer',
  });
  
  const [product, setProduct] = useState({
    id: '123',
    title: 'Vintage Book Collection',
    originalPrice: 150,
    image: '/api/placeholder/80/80',
  });

  const [otherUser, setOtherUser] = useState({
    id: '2',
    name: 'Jane Smith',
    role: 'seller',
  });

  const [conversationStatus, setConversationStatus] = useState('active'); // active, accepted, declined
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [currentOffer, setCurrentOffer] = useState(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Fetch conversation data from API
    // For demo, using mock data
    fetchConversation();
    
    // Scroll to bottom on initial load
    scrollToBottom();
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const fetchConversation = async () => {
    // Mock API call to fetch conversation
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            senderId: '1',
            content: 'Hi, I\'m interested in your book collection.',
            timestamp: '2025-04-22T10:30:00',
            type: 'message'
          },
          {
            id: '2',
            senderId: '2',
            content: 'Hello! Thanks for your interest. Let me know if you have any questions.',
            timestamp: '2025-04-22T10:35:00',
            type: 'message'
          },
          {
            id: '3',
            senderId: '1',
            content: '',
            timestamp: '2025-04-22T10:40:00',
            type: 'offer',
            offerAmount: 120,
            offerStatus: 'pending'
          }
        ]);
        
        setCurrentOffer({
          id: '3',
          senderId: '1',
          offerAmount: 120,
          offerStatus: 'pending'
        });
      }, 500);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      content: messageInput,
      timestamp: new Date().toISOString(),
      type: 'message'
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');

    // In a real app, send the message to the API
    // sendMessageToAPI(newMessage);
  };

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerAmount.trim() || isNaN(offerAmount) || parseFloat(offerAmount) <= 0) {
      alert('Please enter a valid offer amount');
      return;
    }

    const newOffer = {
      id: Date.now().toString(),
      senderId: user.id,
      content: '',
      timestamp: new Date().toISOString(),
      type: 'offer',
      offerAmount: parseFloat(offerAmount),
      offerStatus: 'pending'
    };

    setMessages([...messages, newOffer]);
    setCurrentOffer(newOffer);
    setShowOfferForm(false);
    setOfferAmount('');

    // In a real app, send the offer to the API
    // sendOfferToAPI(newOffer);
  };

  const handleAcceptOffer = (offerId) => {
    // Update the offer status
    const updatedMessages = messages.map(message => {
      if (message.id === offerId && message.type === 'offer') {
        return {
          ...message,
          offerStatus: 'accepted'
        };
      }
      return message;
    });

    setMessages(updatedMessages);
    setConversationStatus('accepted');
    setCurrentOffer(prev => ({...prev, offerStatus: 'accepted'}));

    // In a real app, send the acceptance to the API
    // acceptOfferToAPI(offerId);
  };

  const handleCounterOffer = (offerId) => {
    setShowOfferForm(true);
    // Pre-fill with a slightly different amount
    const originalOffer = messages.find(m => m.id === offerId && m.type === 'offer');
    if (originalOffer) {
      // Set counter offer at midpoint between original price and current offer
      const midpoint = (product.originalPrice + originalOffer.offerAmount) / 2;
      setOfferAmount(midpoint.toFixed(2));
    }
  };

  const handleDeclineOffer = (offerId) => {
    // Update the offer status
    const updatedMessages = messages.map(message => {
      if (message.id === offerId && message.type === 'offer') {
        return {
          ...message,
          offerStatus: 'declined'
        };
      }
      return message;
    });

    setMessages(updatedMessages);
    setCurrentOffer(prev => ({...prev, offerStatus: 'declined'}));

    // In a real app, send the decline to the API
    // declineOfferToAPI(offerId);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isUser = (senderId) => {
    return senderId === user.id;
  };

  const canSendOffer = () => {
    if (user.role !== 'buyer' && user.role !== 'seller') return false;
    if (conversationStatus !== 'active') return false;
    
    // Check if there's a pending offer already
    const pendingOffer = messages.find(m => m.type === 'offer' && m.offerStatus === 'pending');
    return !pendingOffer && !showOfferForm;
  };

  const canRespondToOffer = (offer) => {
    if (conversationStatus !== 'active') return false;
    if (offer.offerStatus !== 'pending') return false;
    return offer.senderId !== user.id;
  };

  return (
    <div className="messages-container">
      <div className="messages-header">
        <div className="conversation-title">
          Conversation with {isUser(otherUser.id) ? user.name : otherUser.name}
        </div>
        <div className={`conversation-status status-${conversationStatus}`}>
          {conversationStatus === 'active' ? 'Active' : 
           conversationStatus === 'accepted' ? 'Deal Accepted' : 'Deal Declined'}
        </div>
      </div>

      <div className="product-info">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-details">
          <div className="product-title">{product.title}</div>
          <div className="product-price">${product.originalPrice}</div>
        </div>
      </div>

      <div className="messages-list">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${isUser(message.senderId) ? 'message-buyer' : 'message-seller'}`}
          >
            {message.type === 'message' ? (
              <>
                <div className="message-content">{message.content}</div>
                <div className="message-meta">{formatTimestamp(message.timestamp)}</div>
              </>
            ) : (
              <div className="offer-container">
                <div className="offer-header">
                  <span className="offer-title">
                    {isUser(message.senderId) ? 'Your Offer' : 'Offer Received'}
                  </span>
                  <span className="offer-amount">${message.offerAmount}</span>
                </div>
                
                <div className="offer-status status-{message.offerStatus}">
                  {message.offerStatus === 'pending' ? 'Pending Response' : 
                   message.offerStatus === 'accepted' ? 'Accepted' : 'Declined'}
                </div>
                
                {canRespondToOffer(message) && (
                  <div className="offer-actions">
                    <button 
                      className="offer-btn accept-btn"
                      onClick={() => handleAcceptOffer(message.id)}
                    >
                      Accept
                    </button>
                    <button 
                      className="offer-btn counter-btn"
                      onClick={() => handleCounterOffer(message.id)}
                    >
                      Counter
                    </button>
                    <button 
                      className="offer-btn decline-btn"
                      onClick={() => handleDeclineOffer(message.id)}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showOfferForm && (
        <div className="offer-form">
          <div className="offer-form-title">
            {currentOffer ? 'Make Counter Offer' : 'Make an Offer'}
          </div>
          <form onSubmit={handleSendOffer}>
            <div className="offer-input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                className="offer-input"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                step="0.01"
                min="0.01"
                required
              />
            </div>
            <div className="offer-actions">
              <button type="submit" className="offer-submit">Send Offer</button>
              <button 
                type="button" 
                className="offer-cancel"
                onClick={() => {
                  setShowOfferForm(false);
                  setOfferAmount('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {conversationStatus === 'active' && (
        <form onSubmit={handleSendMessage} className="message-input-container">
          <textarea
            className="message-input"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            rows={1}
          />
          <button type="submit" className="send-button">
            <span>↑</span>
          </button>
          
          {canSendOffer() && (
            <button 
              type="button" 
              className="offer-btn counter-btn"
              onClick={() => setShowOfferForm(true)}
            >
              Make {currentOffer ? 'Counter ' : ''}Offer
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Messages;