import "./GameCard.css"
function GameCard({ game }) {
  console.log(game); // Debugging: Check what data is being received

  return (
    <div className="game-card">
      <img src={game.image || 'https://via.placeholder.com/300x200'} alt={game.title} />
      <h3>{game.title}</h3>
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Rating:</strong> {game.rating}</p>
      <p>{game.description}</p>
      <p><strong>Price:</strong> ${game.price}</p>
      <button>Read Full Review</button>
    </div>
  );
}

export default GameCard;
