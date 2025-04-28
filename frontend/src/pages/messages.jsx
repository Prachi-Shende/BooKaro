import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './messages.css';

const Messages = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // User authentication state
  const [currentUser, setCurrentUser] = useState({
    id: '1',
    name: 'John Doe',
    role: 'buyer', // Will be 'buyer' or 'seller'
  });
  
  const [product, setProduct] = useState({
    id: '123',
    title: 'Vintage Book Collection',
    originalPrice: 150,
    image: '/api/placeholder/80/80',
  });

  const [conversationStatus, setConversationStatus] = useState('active'); // active, accepted, declined
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [currentOffer, setCurrentOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Bot configuration
  const botUser = {
    id: 'bot',
    name: currentUser.role === 'buyer' ? 'BookSeller Bot' : 'BookBuyer Bot',
    role: currentUser.role === 'buyer' ? 'seller' : 'buyer'
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initialize chat with empty state
    fetchUserData();
  }, []);

  useEffect(() => {
    // Once we have user data, initialize the chat
    if (currentUser.id) {
      initializeChat();
    }
  }, [currentUser]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const fetchUserData = async () => {
    // In a real app, this would fetch the current user's info
    // For this demo, we'll toggle between buyer and seller roles
    
    // Simulate API call
    setTimeout(() => {
      // Determine if this user is the buyer or seller (could be based on URL param)
      const role = window.location.search.includes('role=seller') ? 'seller' : 'buyer';
      
      setCurrentUser({
        id: '1',
        name: role === 'buyer' ? 'John Doe' : 'Jane Smith',
        role: role
      });
    }, 300);
  };

  const initializeChat = () => {
    setIsLoading(true);
    
    // Start with an empty chat
    setMessages([]);
    
    setTimeout(() => {
      // Add a welcome message from the bot
      const welcomeMessage = {
        id: Date.now().toString(),
        senderId: 'bot',
        content: currentUser.role === 'buyer' 
          ? `Hello! Thanks for your interest in the ${product.title}. How can I help you today?` 
          : `Hello! I'm interested in your ${product.title}. Can you tell me more about it?`,
        timestamp: new Date().toISOString(),
        type: 'message'
      };
      
      setMessages([welcomeMessage]);
      setIsLoading(false);
    }, 800);
  };

  // Bot response generation
  const generateBotResponse = (userMessage, userRole) => {
    // Keywords to watch for in user messages
    const priceKeywords = ['price', 'cost', 'how much', 'discount', 'offer'];
    const conditionKeywords = ['condition', 'shape', 'quality', 'state'];
    const shippingKeywords = ['shipping', 'delivery', 'send', 'mail'];
    const greetingKeywords = ['hello', 'hi', 'hey', 'greetings'];
    const acceptKeywords = ['accept', 'deal', 'agreed', 'sounds good'];
    
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Seller bot responses (when user is buyer)
    if (userRole === 'buyer') {
      if (priceKeywords.some(word => lowercaseMessage.includes(word))) {
        return `The collection is listed at $${product.originalPrice}. I'm open to reasonable offers if you're interested.`;
      } else if (conditionKeywords.some(word => lowercaseMessage.includes(word))) {
        return "The books are in excellent condition. Three of them are first editions from the 1950s. The rest are later prints but still vintage. All have been stored in a climate-controlled room.";
      } else if (shippingKeywords.some(word => lowercaseMessage.includes(word))) {
        return "I offer standard shipping for $5 or express shipping for $15. I can ship within 2 business days of payment.";
      } else if (greetingKeywords.some(word => lowercaseMessage.includes(word))) {
        return "Hello! Thanks for your message. Is there anything specific you'd like to know about the book collection?";
      } else if (acceptKeywords.some(word => lowercaseMessage.includes(word))) {
        return "Great! I'm glad we could reach an agreement. Would you like to proceed with the purchase?";
      } else if (lowercaseMessage.includes('payment')) {
        return "I accept credit cards, PayPal, and bank transfers. What works best for you?";
      } else {
        return "Thanks for your message! Do you have any other questions about the book collection?";
      }
    } 
    // Buyer bot responses (when user is seller)
    else {
      if (priceKeywords.some(word => lowercaseMessage.includes(word))) {
        return `Would you consider $${Math.floor(product.originalPrice * 0.8)} for the collection? That would be my budget.`;
      } else if (conditionKeywords.some(word => lowercaseMessage.includes(word))) {
        return "Thanks for the information about the condition. Are there any marks or damage to the covers or bindings?";
      } else if (shippingKeywords.some(word => lowercaseMessage.includes(word))) {
        return "Do you offer international shipping? I'm located overseas.";
      } else if (greetingKeywords.some(word => lowercaseMessage.includes(word))) {
        return "Hi there! I've been looking for vintage books to add to my collection. Could you tell me more about these?";
      } else if (acceptKeywords.some(word => lowercaseMessage.includes(word))) {
        return "Wonderful! I'm ready to complete the purchase whenever you are.";
      } else if (lowercaseMessage.includes('payment')) {
        return "I prefer to pay via PayPal if that works for you?";
      } else {
        return "Thanks for the information! I'm definitely interested. Would you be open to offers?";
      }
    }
  };

  // Handle bot response with typing indicator
  const triggerBotResponse = (userMessage) => {
    // Show typing indicator
    setIsTyping(true);
    
    // Random delay between 1-3 seconds to simulate typing
    const typingDelay = Math.floor(Math.random() * 2000) + 1000;
    
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage, currentUser.role);
      
      const botMessage = {
        id: Date.now().toString(),
        senderId: 'bot',
        content: botResponse,
        timestamp: new Date().toISOString(),
        type: 'message'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // If it's a seller bot and the user hasn't made an offer yet, bot might make an offer
      if (currentUser.role === 'buyer' && !currentOffer && Math.random() > 0.7) {
        setTimeout(() => {
          // Bot might suggest a discount
          const suggestedDiscount = Math.floor(product.originalPrice * 0.9);
          
          setIsTyping(true);
          
          setTimeout(() => {
            const offerMessage = {
              id: Date.now().toString(),
              senderId: 'bot',
              content: `I can offer you a special price of $${suggestedDiscount} if you're interested.`,
              timestamp: new Date().toISOString(),
              type: 'message'
            };
            
            setMessages(prev => [...prev, offerMessage]);
            setIsTyping(false);
          }, 1500);
        }, 3000);
      }
    }, typingDelay);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: messageInput,
      timestamp: new Date().toISOString(),
      type: 'message'
    };

    setMessages([...messages, newMessage]);
    
    // Store message to respond to
    const sentMessage = messageInput;
    setMessageInput('');

    // Trigger bot response
    triggerBotResponse(sentMessage);
  };

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerAmount.trim() || isNaN(offerAmount) || parseFloat(offerAmount) <= 0) {
      alert('Please enter a valid offer amount');
      return;
    }

    const newOffer = {
      id: Date.now().toString(),
      senderId: currentUser.id,
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

    // Bot responds to the offer
    setIsTyping(true);
    
    // Bot considers the offer
    setTimeout(() => {
      const offerAmount = newOffer.offerAmount;
      const offerPercentage = offerAmount / product.originalPrice;
      
      // Bot's decision logic
      if (offerPercentage >= 0.85) {
        // Accept if offer is 85% or more of original price
        const acceptMessage = {
          id: Date.now().toString(),
          senderId: 'bot',
          content: `Thank you for your offer of $${offerAmount}. I'm happy to accept!`,
          timestamp: new Date().toISOString(),
          type: 'message'
        };
        
        setMessages(prev => [...prev, acceptMessage]);
        
        setTimeout(() => {
          handleBotAcceptOffer(newOffer.id);
        }, 1000);
      } 
      else if (offerPercentage >= 0.7) {
        // Counter if offer is between 70-85% of original price
        const counterAmount = Math.round(product.originalPrice * 0.9);
        const counterMessage = {
          id: Date.now().toString(),
          senderId: 'bot',
          content: `Thank you for your offer. I can't go that low, but I could do $${counterAmount}. Would that work for you?`,
          timestamp: new Date().toISOString(),
          type: 'message'
        };
        
        setMessages(prev => [...prev, counterMessage]);
        
        setTimeout(() => {
          const counterOffer = {
            id: Date.now().toString(),
            senderId: 'bot',
            content: '',
            timestamp: new Date().toISOString(),
            type: 'offer',
            offerAmount: counterAmount,
            offerStatus: 'pending'
          };
          
          setMessages(prev => [...prev, counterOffer]);
          setCurrentOffer(counterOffer);
        }, 1500);
      }
      else {
        // Decline if offer is less than 70% of original price
        const declineMessage = {
          id: Date.now().toString(),
          senderId: 'bot',
          content: `I appreciate your interest, but I can't accept $${offerAmount}. It's too far below my asking price. Perhaps you could make a more competitive offer?`,
          timestamp: new Date().toISOString(),
          type: 'message'
        };
        
        setMessages(prev => [...prev, declineMessage]);
        
        setTimeout(() => {
          handleBotDeclineOffer(newOffer.id);
          
          // Add an additional message to encourage continued conversation
          setTimeout(() => {
            const followUpMessage = {
              id: Date.now().toString(),
              senderId: 'bot',
              content: "I'm still interested in selling this collection. Would you like to make another offer or discuss the price further?",
              timestamp: new Date().toISOString(),
              type: 'message'
            };
            
            setMessages(prev => [...prev, followUpMessage]);
          }, 2000);
        }, 1000);
      }
      
      setIsTyping(false);
    }, 3000);
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

    // Add a system message about the acceptance
    const systemMessage = {
      id: Date.now().toString(),
      senderId: 'system',
      content: `Offer of $${currentOffer.offerAmount} has been accepted. The transaction can now be completed.`,
      timestamp: new Date().toISOString(),
      type: 'message',
      isSystem: true
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, systemMessage]);
      
      // Bot responds to acceptance
      setIsTyping(true);
      
      setTimeout(() => {
        const acceptanceResponse = {
          id: Date.now().toString(),
          senderId: 'bot',
          content: "Great! I'm glad we could agree on a price. I'll prepare everything for shipment. Would you like to proceed to checkout now?",
          timestamp: new Date().toISOString(),
          type: 'message'
        };
        
        setMessages(prev => [...prev, acceptanceResponse]);
        setIsTyping(false);
      }, 1500);
    }, 500);
  };

  const handleBotAcceptOffer = (offerId) => {
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

    // Add a system message about the acceptance
    const systemMessage = {
      id: Date.now().toString(),
      senderId: 'system',
      content: `Offer of $${currentOffer.offerAmount} has been accepted. The transaction can now be completed.`,
      timestamp: new Date().toISOString(),
      type: 'message',
      isSystem: true
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleCounterOffer = (offerId) => {
    setShowOfferForm(true);
    // Pre-fill with a slightly different amount
    const originalOffer = messages.find(m => m.id === offerId && m.type === 'offer');
    if (originalOffer) {
      // If seller, set counter offer slightly higher
      // If buyer, set counter offer slightly lower
      let counterAmount;
      if (currentUser.role === 'seller') {
        counterAmount = (product.originalPrice + originalOffer.offerAmount) / 2;
      } else {
        counterAmount = originalOffer.offerAmount * 0.95; // 5% lower
      }
      setOfferAmount(counterAmount.toFixed(2));
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
    
    // Important: We set the current offer status to declined,
    // but we don't change the conversation status, so it stays active
    setCurrentOffer(prev => ({...prev, offerStatus: 'declined'}));
    
    // Add a system message about the decline
    const systemMessage = {
      id: Date.now().toString(),
      senderId: 'system',
      content: `Offer of $${currentOffer.offerAmount} has been declined.`,
      timestamp: new Date().toISOString(),
      type: 'message',
      isSystem: true
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, systemMessage]);
      
      // Bot responds to decline but keeps conversation going
      setIsTyping(true);
      
      setTimeout(() => {
        const declineResponse = {
          id: Date.now().toString(),
          senderId: 'bot',
          content: "I understand. Would you like to make a different offer that you think would be fair?",
          timestamp: new Date().toISOString(),
          type: 'message'
        };
        
        setMessages(prev => [...prev, declineResponse]);
        setIsTyping(false);
      }, 1500);
    }, 500);
  };

  const handleBotDeclineOffer = (offerId) => {
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
    
    // Important: We're only updating the offer status to declined,
    // but we keep the conversation status as active
    setCurrentOffer(prev => ({...prev, offerStatus: 'declined'}));
    
    // Add a system message about the decline
    const systemMessage = {
      id: Date.now().toString(),
      senderId: 'system',
      content: `Offer of $${currentOffer.offerAmount} has been declined.`,
      timestamp: new Date().toISOString(),
      type: 'message',
      isSystem: true
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    
    messages.forEach(message => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  const isCurrentUser = (senderId) => {
    return senderId === currentUser.id;
  };

  const isBot = (senderId) => {
    return senderId === 'bot';
  };

  const isSystem = (senderId) => {
    return senderId === 'system';
  };

  const canSendOffer = () => {
    if (conversationStatus !== 'active') return false;
    
    // Only buyers can initiate offers, sellers can only counter
    if (currentUser.role === 'buyer') {
      // Check if there's a pending offer already
      const pendingOffer = messages.find(m => m.type === 'offer' && m.offerStatus === 'pending');
      return !pendingOffer && !showOfferForm;
    } else if (currentUser.role === 'seller') {
      // Sellers can only counter offers
      return false;
    }
    
    return false;
  };

  const canRespondToOffer = (offer) => {
    if (conversationStatus !== 'active') return false;
    if (offer.offerStatus !== 'pending') return false;
    return offer.senderId !== currentUser.id;
  };

  const renderMessageContent = (message) => {
    if (message.type === 'message') {
      if (message.isSystem) {
        return (
          <div className="system-message">
            <div className="system-content">{message.content}</div>
            <div className="message-meta">{formatTimestamp(message.timestamp)}</div>
          </div>
        );
      }
      
      let messageClass = "message";
      
      if (isCurrentUser(message.senderId)) {
        messageClass += " message-buyer";
      } else if (isBot(message.senderId)) {
        messageClass += " message-seller";
      }
      
      return (
        <div className={messageClass}>
          <div className="message-content">{message.content}</div>
          <div className="message-meta">{formatTimestamp(message.timestamp)}</div>
        </div>
      );
    } else if (message.type === 'offer') {
      return (
        <div className={`message ${isCurrentUser(message.senderId) ? 'message-buyer' : 'message-seller'}`}>
          <div className="offer-container">
            <div className="offer-header">
              <span className="offer-title">
                {isCurrentUser(message.senderId) ? 'Your Offer' : `${botUser.name}'s Offer`}
              </span>
              <span className="offer-amount">${message.offerAmount.toFixed(2)}</span>
            </div>
            
            <div className={`offer-status status-${message.offerStatus}`}>
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
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="messages-container">
        <div className="loading-indicator">Loading conversation...</div>
      </div>
    );
  }

  return (
    <div className="messages-container">
      <div className="messages-header">
        <div className="conversation-title">
          Conversation with Mahima
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
          <div className="product-price">${product.originalPrice.toFixed(2)}</div>
        </div>
      </div>

      <div className="messages-list">
        {Object.keys(messageGroups).map(date => (
          <div key={date} className="message-date-group">
            <div className="message-date-divider">
              <span>{date}</span>
            </div>
            
            {messageGroups[date].map(message => (
              <div key={message.id}>
                {renderMessageContent(message)}
              </div>
            ))}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="message message-seller">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {showOfferForm && (
        <div className="offer-form">
          <div className="offer-form-title">
            {currentOffer && currentOffer.senderId !== currentUser.id ? 'Make Counter Offer' : 'Make an Offer'}
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
        <div className="message-input-wrapper">
          <textarea
            className="message-input"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            rows={1}
          />
          <button type="submit" className="send-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        
        <div className="offer-actions-container">
          {canSendOffer() && (
            <button 
              type="button" 
              className="offer-btn counter-btn"
              onClick={() => setShowOfferForm(true)}
            >
              Make Offer
            </button>
          )}
          
          {currentOffer && currentOffer.senderId !== currentUser.id && currentOffer.offerStatus === 'pending' && (
            <button 
              type="button" 
              className="offer-btn counter-btn"
              onClick={() => handleCounterOffer(currentOffer.id)}
            >
              Counter Offer
            </button>
          )}
        </div>
      </form>
      )}
      
      {conversationStatus === 'accepted' && (
        <div className="deal-completed-message">
          <p>Deal completed! The transaction is now ready to be finalized.</p>
          <button 
            className="primary-btn"
            onClick={() => navigate(view-cart)}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Messages;