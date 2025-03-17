import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/GameCard.css';

const GameCard = ({ game, onDelete }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/api/games/${game._id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          onDelete(game._id);
        } else {
          console.error('Delete failed');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} className="game-image" />
      <h3>{game.title}</h3>
      <p>Genre: {game.genre}</p>
      <p>Platform: {game.platform}</p>
      <p>Rating: {game.rating} / 10</p>
      <p className="description">{game.description}</p>
      <p className="price">${game.price}</p>
      <div className="button-container">
        <Link to={`/update/${game._id}`} className="edit-button">Edit</Link>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default GameCard;