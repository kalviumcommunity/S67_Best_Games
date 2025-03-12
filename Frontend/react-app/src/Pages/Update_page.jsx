import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateGame = () => {
  const { id } = useParams();   
  console.log("Extracted Game ID:", id);
  const navigate = useNavigate();
  const [game, setGame] = useState({ title: '', genre: '', rating: '', description: '', price: '' });

  useEffect(() => {
    if (!id) {
      console.error("Game ID is missing!");
      return;
    }

    fetch(`/api/games/${id}`)
      .then(res => res.json())
      .then(data => setGame(data))
      .catch(err => console.error("Error fetching game:", err));
  }, [id]);

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      console.error("Cannot update - Game ID is missing!");
      return;
    }

    fetch(`http://localhost:3000/api/games/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    })
    .then(res => res.json())
    .then(updatedGame => {
      console.log("Game updated:", updatedGame);
      navigate('/');
    })
    .catch(err => console.error("Update failed:", err));
  };

  return (
    <div>
      <h2>Update Game</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={game.title} onChange={handleChange} placeholder="Title" required />
        <input name="genre" value={game.genre} onChange={handleChange} placeholder="Genre" required />
        <input name="rating" value={game.rating} onChange={handleChange} placeholder="Rating (1-10)" required type="number" min="1" max="10" />
        <input name="description" value={game.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" value={game.price} onChange={handleChange} placeholder="Price ($)" required type="number" min="0" />
        <button onSubmit={handleSubmit} type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateGame;

