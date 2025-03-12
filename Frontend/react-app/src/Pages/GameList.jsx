import GameCard from '../Components/GameCard';
import "./GameList.css"

function GameList({ games }) {

  return (
    <div className="game-list">
      {games.length === 0 ? (
        <p>No games available. Add some games!</p>
      ) : (
        games.map(game =>(<div key={game._id}> <GameCard key={game._id} game={game} /> </div>))
      )}
    </div>
  );
}

export default GameList;
