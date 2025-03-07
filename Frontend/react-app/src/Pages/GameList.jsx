import GameCard from '../Components/GameCard';

function GameList({ games }) {
  return (
    <div className="game-list">
      {games.length === 0 ? (
        <p>No games available. Add some games!</p>
      ) : (
        games.map(game => <GameCard key={game._id} game={game} />)
      )}
    </div>
  );
}

export default GameList;
