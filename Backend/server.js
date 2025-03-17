const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const connectDB = require('./database');
const Game = require('./schema');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

connectDB();

const gameValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('platform').notEmpty().withMessage('Platform is required'),
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isFloat({ min: 1, max: 10 }).withMessage('Rating must be between 1 and 10'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('image').optional().isURL().withMessage('Image must be a valid URL')
];

app.get('/api/games', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/games', gameValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {    
        const newGame = new Game(req.body);
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/games/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id);
        
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        
        res.json(game);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get game' });
    }
});

app.put('/api/games/:id', gameValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const updatedGame = req.body;
    
        const game = await Game.findByIdAndUpdate(id, updatedGame, { new: true });
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
    
        res.json(game);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update game' });
    }
});

app.delete('/api/games/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGame = await Game.findByIdAndDelete(id);
        
        if (!deletedGame) {
            return res.status(404).json({ error: 'Game not found' });
        }
        
        res.json({ message: 'Game deleted successfully', deletedId: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete game' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});