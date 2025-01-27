const mongoose = require('mongoose');

const RocketLeagueMatchSchema = new mongoose.Schema({
  date: {
    type: Date, // Exemple : "2025-01-26"
    required: true,
  },
  equipe1: {
    nom: {
      type: String, // Exemple : "Gentle Mates"
      required: true,
    },
    joueurs: [
      {
        pseudo: { type: String, required: true }, // Exemple : "Player1"
      },
    ],
    coach: {
      pseudo: { type: String, required: true }, // Exemple : "Coach1"
    },
  },
  equipe2: {
    nom: {
      type: String, // Exemple : "Vitality"
      required: true,
    },
    joueurs: [
      {
        pseudo: { type: String, required: true }, // Exemple : "Player2"
      },
    ],
    coach: {
      pseudo: { type: String, required: true }, // Exemple : "Coach2"
    },
  },
  event: {
    type: String, // Exemple : "RLCS 2025 - Birmingham Major: EU Open 1"
    required: true,
  },
  enjeu: {
    type: String, // Exemple : "OPEN / Round swiss"
    required: true,
  },
  bo: {
    type: String, // Exemple : "BO3"
    required: true,
  },
  scoreBO: {
    type: String, // Exemple : "3-2"
    required: true,
  },
  matchs: [
    {
      scoreGentleMates: Number,
      scoreAdversaire: Number,
    },
  ],
  stats: {
    meilleurButeur: [
      {
        joueur: String,
        buts: Number,
      },
    ],
    meilleurPasseur: [
      {
        joueur: String,
        passes: Number,
      },
    ],
    meilleurDefenseur: [
      {
        joueur: String,
        saves: Number,
      },
    ],
    mvp: {
      type: String, // Exemple : "Player1"
      required: true,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('RocketLeagueMatch', RocketLeagueMatchSchema);
