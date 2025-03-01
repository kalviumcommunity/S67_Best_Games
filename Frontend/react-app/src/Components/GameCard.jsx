import React from 'react';
import PropTypes from 'prop-types';
import './GameCard.css';

const GameCard = ({ 
  title, 
  genre,
  rating, 
  imageUrl, 
  description,
  price,
  onReviewClick 
}) => {
  return (
    <div className="game-card">
      <div className="game-card-image">
        <img src={imageUrl || "https://placehold.co/300x200"} alt={title} />
        {rating && <div className="game-card-rating">{rating}</div>}
      </div>
      
      <div className="game-card-content">
        <h2 className="game-card-title">{title}</h2>
        <div className="game-card-meta">
          {genre && <span className="game-card-genre">{genre}</span>}
          {price && <span className="game-card-price">{price}</span>}
        </div>
        
        {description && <p className="game-card-description">{description}</p>}
        
        <button 
          className="game-card-button" 
          onClick={onReviewClick}
        >
          Read Full Review
        </button>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  onReviewClick: PropTypes.func
};

GameCard.defaultProps = {
  imageUrl: "https://placehold.co/300x200",
  onReviewClick: () => console.log("Review button clicked")
};

export default GameCard;