const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
