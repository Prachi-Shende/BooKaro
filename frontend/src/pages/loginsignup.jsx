// src/pages/loginSignup.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/auth';  // Import auth (Firebase Authentication)
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { db } from '../firebase/db';  // Import Firestore (db)


//import 'bootstrap/dist/css/bootstrap.min.css';

const LoginSignupPopup = ({ isOpen, onClose }) => {
  // State management
  const [isLogin, setIsLogin] = useState(true);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeToNewsletter: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVJTI, setIsVJTI] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Reset form when popup closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        subscribeToNewsletter: false
      });
      setErrors({});
      setIsLoading(false);
      setIsLogin(true); // Reset to login tab when closing
    }
  }, [isOpen]);

  // Styles (same as your original)
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    popupContainer: {
      position: 'relative',
      backgroundColor: 'white',
      width: '800px',
      height: '600px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex'
    },
    imageContainer: {
      flex: 1,
      backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '40px'
    },
    formContainer: {
      flex: 1,
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      cursor: 'pointer',
      fontSize: '20px',
      zIndex: 1010,
      backgroundColor: 'transparent',
      border: 'none',
      color: '#333'
    },
    tabContainer: {
      display: 'flex',
      width: '100%',
      marginBottom: '30px'
    },
    tab: {
      flex: 1,
      padding: '15px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontWeight: 'bold',
      fontSize: '16px'
    },
    activeTab: {
      backgroundColor: '#3f51b5',
      color: 'white',
      borderBottom: '3px solid #1a237e'
    },
    inactiveTab: {
      backgroundColor: '#f5f5f5',
      color: '#333',
      borderBottom: '1px solid #ddd'
    },
    form: {
      width: '100%'
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '12px 12px 12px 40px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      transition: 'border 0.3s'
    },
    icon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#999'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      fontSize: '14px'
    },
    checkbox: {
      marginRight: '10px',
      accentColor: '#3f51b5'
    },
    submitButton: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#3f51b5',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '10px',
      transition: 'background-color 0.3s'
    },
    nameContainer: {
      display: 'flex',
      gap: '15px'
    },
    halfWidth: {
      flex: 1
    },
    welcomeText: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '16px',
      marginBottom: '30px',
      textAlign: 'center'
    }
  };

  // Password strength calculator
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/\d/.test(formData.password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) strength += 1;
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) strength += 1;

    setPasswordStrength(strength);
  }, [formData.password]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && !formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const promptForRole = () => {
    const role = window.prompt('Are you a Student, Seller, or Renter? (Type one)');
    if (role) {
      setUserRole(role.toLowerCase());
      alert(`Thank you! You are registered as a ${role}${isVJTI ? ' from VJTI' : ''}.`);
      onClose(); // Use the provided onClose prop
    }
  };
  
const handleLogout = async () => {
  try {
    await signOut(auth);
    alert('Logged out successfully!');
    // Optional: Clear any local storage or redirect to login page if needed
  } catch (error) {
    console.error('Error logging out:', error);
    alert('Logout failed. Please try again.');
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert('Login successful!');
        onClose();
      } else {
        // Signup
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
  
        // Save only Name and Email
        await setDoc(doc(db, 'users', user.uid), {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        });
  
        alert('Signup successful!');
        onClose();
      }
    } catch (error) {
      console.error('Error during login/signup:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
    

  // Password strength indicator
  const renderPasswordStrength = () => {
    if (!formData.password) return null;
    
    const strengthText = [
      'Very Weak',
      'Weak',
      'Medium',
      'Strong',
      'Very Strong'
    ][passwordStrength];
    
    const strengthColor = [
      'red',
      'orange',
      'yellow',
      'lightgreen',
      'green'
    ][passwordStrength];
    
    return (
      <div style={{ marginTop: '5px', fontSize: '12px' }}>
        Password Strength: 
        <span style={{ color: strengthColor, fontWeight: 'bold', marginLeft: '5px' }}>
          {strengthText}
        </span>
      </div>
    );
  };

  // If not open, don't render anything
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popupContainer}>
        <button style={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        {/* Image Section */}
        <div style={styles.imageContainer}>
          <div style={styles.imageOverlay}>
            <h2 style={styles.welcomeText}>
              {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
            </h2>
            <p style={styles.subtitle}>
              {isLogin 
                ? 'Login to access your account and continue your journey with us.' 
                : 'Create an account to get started and explore all the features.'}
            </p>
          </div>
        </div>
        
        {/* Form Section */}
        <div style={styles.formContainer}>
          <div style={styles.tabContainer}>
            <div 
              style={{...styles.tab, ...(isLogin ? styles.activeTab : styles.inactiveTab)}} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </div>
            <div 
              style={{...styles.tab, ...(!isLogin ? styles.activeTab : styles.inactiveTab)}} 
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </div>
          </div>
          
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <div style={styles.icon}>
                @
              </div>
              <input
                style={{...styles.input, ...(errors.email && { borderColor: 'red' })}}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
                onBlur={(e) => e.target.style.borderColor = errors.email ? 'red' : '#ddd'}
              />
              {errors.email && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email}</div>}
            </div>
            
            {!isLogin && (
              <div style={styles.nameContainer}>
                <div style={{...styles.inputGroup, ...styles.halfWidth}}>
                  <div style={styles.icon}>
                    👤
                  </div>
                  <input
                    style={{...styles.input, ...(errors.firstName && { borderColor: 'red' })}}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
                    onBlur={(e) => e.target.style.borderColor = errors.firstName ? 'red' : '#ddd'}
                  />
                  {errors.firstName && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.firstName}</div>}
                </div>
                
                <div style={{...styles.inputGroup, ...styles.halfWidth}}>
                  <div style={styles.icon}>
                    👤
                  </div>
                  <input
                    style={{...styles.input, ...(errors.lastName && { borderColor: 'red' })}}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
                    onBlur={(e) => e.target.style.borderColor = errors.lastName ? 'red' : '#ddd'}
                  />
                  {errors.lastName && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.lastName}</div>}
                </div>
              </div>
            )}
            
            <div style={styles.inputGroup}>
              <div style={styles.icon}>
                🔒
              </div>
              <input
                style={{...styles.input, ...(errors.password && { borderColor: 'red' })}}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
                onBlur={(e) => e.target.style.borderColor = errors.password ? 'red' : '#ddd'}
              />
              <button
                type="button"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              {renderPasswordStrength()}
              {errors.password && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.password}</div>}
            </div>
            
            {!isLogin && (
              <>
                <div style={styles.inputGroup}>
                  <div style={styles.icon}>
                    🔒
                  </div>
                  <input
                    style={{...styles.input, ...(errors.confirmPassword && { borderColor: 'red' })}}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
                    onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? 'red' : '#ddd'}
                  />
                  <button
                    type="button"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                  {errors.confirmPassword && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.confirmPassword}</div>}
                </div>
                
                <div style={styles.checkboxContainer}>
                  <input
                    style={styles.checkbox}
                    type="checkbox"
                    id="newsletter"
                    name="subscribeToNewsletter"
                    checked={formData.subscribeToNewsletter}
                    onChange={handleChange}
                  />
                  <label htmlFor="newsletter">Subscribe to our newsletter</label>
                </div>
                
                <div style={styles.checkboxContainer}>
                  <input
                    style={{...styles.checkbox, ...(errors.agreeToTerms && { outline: '1px solid red' })}}
                    type="checkbox"
                    id="terms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <label htmlFor="terms">I accept the Terms of Service and Privacy Policy</label>
                  {errors.agreeToTerms && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.agreeToTerms}</div>}
                </div>
              </>
            )}
            
            <button 
              type="submit" 
              style={{
                ...styles.submitButton,
                ...(isLoading && { backgroundColor: '#ccc', cursor: 'not-allowed' })
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#303f9f')}
              onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#3f51b5')}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {isLogin ? 'Logging in...' : 'Signing up...'}
                </>
              ) : (
                isLogin ? 'Login' : 'Sign Up'
              )}
            </button>

            {isLogin && (
              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
                <a href="#" style={{ color: '#3f51b5' }}>Forgot password?</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPopup;