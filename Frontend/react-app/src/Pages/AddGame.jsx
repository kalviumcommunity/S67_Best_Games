import { useState } from 'react';

function AddGameForm({ fetchGames }) {
  const [newGame, setNewGame] = useState({ title: '', genre: '', rating: '', description: '', price: '' });

  const handleChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame)
      });
      if (response.ok) {
        setNewGame({ title: '', genre: '', rating: '', description: '', price: '' });
        fetchGames(); 
      } else {
        console.error('Failed to add game');
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div className="add-game-form">
      <h2>Add a New Game</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={newGame.title} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" value={newGame.genre} onChange={handleChange} required />
        <input type="text" name="rating" placeholder="Rating" value={newGame.rating} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={newGame.description} onChange={handleChange} required />
        <input type="text" name="price" placeholder="Price" value={newGame.price} onChange={handleChange} required />
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default AddGameForm;
