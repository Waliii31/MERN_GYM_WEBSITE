import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Dumbbell } from 'lucide-react';
import '../App.css';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FitnessAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // LOGIN FUNCTION (axios)
  const loginUser = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      console.log(res); // Optional: debug in console

      localStorage.setItem("user", JSON.stringify({
        id: res.data.user.id,
        email: res.data.user.email
      }));

      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };



  // SIGNUP FUNCTION (axios)
  const signupUser = async () => {
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      alert('Signup successful!');
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? loginUser() : signupUser();
  };

  return (
    <div className="auth-container">
      <div className="main-content">
        <div className="auth-wrapper">
          <div className="logo-section">
            <div className="logo-icon"><Dumbbell className="dumbbell-icon" /></div>
            <h1 className="brand-title">ELITE EDGE FITNESS</h1>
            <p className="brand-subtitle">Transform your body, elevate your mind</p>
          </div>

          <div className="auth-card">
            <div className="toggle-container">
              <button
                onClick={() => setIsLogin(true)}
                className={`toggle-btn ${isLogin ? 'toggle-btn-active' : ''}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`toggle-btn ${!isLogin ? 'toggle-btn-active' : ''}`}
              >
                SIGNUP
              </button>
            </div>

            <form className="form-container" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="name-fields">
                  <div className="input-group">
                    <User className="input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="auth-input"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <User className="input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="auth-input"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="auth-input"
                  required
                />
              </div>

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="auth-input password-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>

              {!isLogin && (
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="auth-input password-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                  </button>
                </div>
              )}

              {isLogin && (
                <div className="forgot-password">
                  <button type="button" className="forgot-link">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="switch-auth">
              <p className="switch-text">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="switch-link"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>

          <p className="footer-text">
            Ready to transform your fitness journey?
          </p>
        </div>
      </div>
    </div>
  );
}
