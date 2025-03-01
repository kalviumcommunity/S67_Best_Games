import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import About from './Pages/About_page'
import GameCard from './Components/GameCard'

function App() {
  const games = [
    {
      title: "Elden Ring",
      genre: "Action RPG",
      rating: "9.5",
      description: "Explore a vast open world filled with danger and discovery.Elden Ring won several Game of the Year awards and has been cited as one of the greatest games of all time",
      price: "$2"
    },
    {
      title: "Horizon Zero Dawn 2",
      genre: "Action Adventure",
      rating: "9.0",
      description: "Embark on a new journey with Aloy in a breathtaking post-apocalyptic world filled with robotic creatures.",
      price: "$1.99"
    }
  ];

  const handleReviewClick = (gameTitle) => {
    console.log(`Viewing review for ${gameTitle}`);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/games">Games</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />          
          <Route 
            path="/games" 
            element={
              <div className="games-container">
                {games.map((game, index) => (
                  <GameCard 
                    key={index}
                    {...game}
                    onReviewClick={() => handleReviewClick(game.title)}
                  />
                ))}
              </div>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to GameReviews 2024</h1>
      <p>Use the navigation above to explore my favorite games of 2024.</p>
    </div>
  );
}

export default App
