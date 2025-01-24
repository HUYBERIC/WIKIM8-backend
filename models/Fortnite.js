const mongoose = require('mongoose');

// Schéma pour un joueur
const JoueurSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
  },
  structure: {
    type: String,
    required: true,
  },
});

// Schéma pour une game
const GameSchema = new mongoose.Schema({
  classement: {
    type: Number,
    required: true,
  },
  kills: {
    type: Number,
    required: true,
  },
});

// Schéma pour une équipe
const TeamSchema = new mongoose.Schema({
  roosterId: {
    type: String, // ID unique pour différencier les équipes
    required: true,
  },
  rooster: {
    type: [JoueurSchema], // La taille sera contrôlée via `typeCompetition`
    required: true,
  },
  games: {
    type: [GameSchema],
    required: true,
  },
  stats: {
    killsTotal: {
      type: Number,
      required: true,
    },
    topFinal: {
      type: Number,
      required: true,
    },
  },
});

// Schéma pour une compétition Fortnite
const FortniteCompetitionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    nomCompetition: {
      type: String,
      required: true,
    },
    week: {
      type: String,
    },
    typeCompetition: {
      type: String, // Solo, Duo ou Trio
      enum: ['Solo', 'Duo', 'Trio'],
      required: true,
    },
    teams: {
      type: [TeamSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FortniteCompetition', FortniteCompetitionSchema);
