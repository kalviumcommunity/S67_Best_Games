import { useState } from 'react';

const AuthPage = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    
    if (isLoginMode) {
      localStorage.setItem('authToken', 'mock-jwt-token');
      onLogin(); 
    } else {
      alert('Account created successfully! Please log in.');
      setIsLoginMode(true);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(prev => !prev);
    setFormData({
      email: '',
      password: '',
      name: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-header">
          <h1>{isLoginMode ? 'Log In' : 'Sign Up'}</h1>
          <p>{isLoginMode ? 'Welcome back!' : 'Create your account'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="auth-button">
            {isLoginMode ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-toggle">
          <button onClick={toggleMode} className="toggle-button">
            {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;