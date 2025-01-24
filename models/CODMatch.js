const mongoose = require('mongoose');

const PlayerStatsSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
  },
  kills: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  ratio: {
    type: Number,
    required: true,
  },
});

const GameSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
  },
  modeDeJeu: {
    type: String, // Exemple : "Hardpoint", "Search & Destroy"
    required: true,
  },
  map: {
    type: String, // Exemple : "Hotel", "Embassy"
    required: true,
  },
  equipe1Stats: {
    type: [PlayerStatsSchema],
    required: true,
    validate: {
      validator: (v) => v.length === 4,
      message: 'L’équipe 1 doit contenir exactement 4 joueurs.',
    },
  },
  equipe2Stats: {
    type: [PlayerStatsSchema],
    required: true,
    validate: {
      validator: (v) => v.length === 4,
      message: 'L’équipe 2 doit contenir exactement 4 joueurs.',
    },
  },
});

const CoDMatchSchema = new mongoose.Schema(
  {
    // Partie Générale
    date: {
      type: Date,
      required: true,
    },
    event: {
      type: String, // Exemple : "CDL Major 2025"
      required: true,
    },
    week: {
      type: String, // Exemple : "Week 2"
    },
    equipe1: {
      nom: {
        type: String,
        required: true,
      },
      coach: {
        type: String,
        required: true,
      },
      joueurs: {
        type: [String], // Liste des pseudos
        required: true,
        validate: {
          validator: (v) => v.length === 4,
          message: 'L’équipe 1 doit contenir exactement 4 joueurs.',
        },
      },
    },
    equipe2: {
      nom: {
        type: String,
        required: true,
      },
      coach: {
        type: String,
        required: true,
      },
      joueurs: {
        type: [String], // Liste des pseudos
        required: true,
        validate: {
          validator: (v) => v.length === 4,
          message: 'L’équipe 2 doit contenir exactement 4 joueurs.',
        },
      },
    },
    scoreBO: {
      type: String, // Exemple : "3-2"
      required: true,
    },
    typeBO: {
      type: String,
      enum: ['BO3', 'BO5', 'BO7', 'BO9'],
      default: 'BO5',
    },

    // Partie Statistiques
    games: {
      type: [GameSchema],
      validate: {
        validator: (v) => v.length >= 3 && v.length <= 9,
        message: 'Un BO doit contenir entre 3 et 9 parties.',
      },
    },

    // Récompenses
    rewards: {
      topKills: {
        joueur: {
          type: String,
          required: true,
        },
        kills: {
          type: Number,
          required: true,
        },
      },
      topRatio: {
        joueur: {
          type: String,
          required: true,
        },
        ratio: {
          type: Number,
          required: true,
        },
      },
      mvp: {
        type: String, // Joueur MVP
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CoDMatch', CoDMatchSchema);
