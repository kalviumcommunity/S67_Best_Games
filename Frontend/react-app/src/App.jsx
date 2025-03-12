import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddGameForm from './Pages/AddGame';
import About from './Pages/About_page';
import GameList from './Pages/GameList';
import UpdateGame from './Pages/Update_page';

function App() {
  const [games, setGames] = useState([]);

  const fetchGames = () => {
    fetch('http://localhost:3000/api/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error fetching games:', error));
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/add-game">Add Game</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Best Games Project</h1>} />
          <Route path="/games" element={<GameList games={games} />} />
          <Route path="/add-game" element={<AddGameForm fetchGames={fetchGames} />} />
          <Route path="/about" element={<About />} />
          <Route path="/update/:id" element={<UpdateGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;