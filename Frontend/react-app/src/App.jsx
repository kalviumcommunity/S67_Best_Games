import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddGameForm from './Pages/AddGame';
import About from './Pages/About_page';
import GameList from './Pages/GameList';
import UpdateGame from './Pages/Update_page';
import AuthPage from './Pages/AuthPage'; 

function App() {
  const [games, setGames] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchGames = () => {
    fetch('http://localhost:3000/api/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error fetching games:', error));
  };

  useEffect(() => {
    fetchGames();
    
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/games">Games</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/add-game">Add Game</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
              </>
            ) : (
              <li><Link to="/auth">Login/Signup</Link></li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Best Games Project</h1>} />
          <Route path="/games" element={<GameList games={games} />} />
          <Route 
            path="/add-game" 
            element={isAuthenticated ? <AddGameForm fetchGames={fetchGames} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/about" 
            element={isAuthenticated ? <About /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/update/:id" 
            element={isAuthenticated ? <UpdateGame /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/auth" 
            element={!isAuthenticated ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;