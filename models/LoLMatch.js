const mongoose = require('mongoose');

const LoLMatchSchema = new mongoose.Schema(
  {
    equipe1: {
      type: String, // Exemple : "T1"
      required: true,
    },
    equipe2: {
      type: String, // Exemple : "Gentle Mates"
      required: true,
    },
    date: {
      type: Date, // Exemple : "2024-12-15"
      required: true,
    },
    event: {
      type: String, // Exemple : "Red Bull League of Its Own 2024"
      required: true,
    },
    enjeu: {
      type: String, // Exemple : "Showmatch"
      required: true,
    },
    bo: {
      type: String, // Exemple : "BO3"
      required: true,
    },
    scoreFinal: {
      type: String, // Exemple : "0 - 1"
      required: true,
    },
    games: [
      {
        numero: { type: Number, required: true }, // Numéro de la game (1, 2, 3, etc.)
        scoreEquipe1: { type: Number, required: true }, // Score de l'équipe 1
        scoreEquipe2: { type: Number, required: true }, // Score de l'équipe 2
        draft1: {
          type: [
            {
              pseudo: { type: String, required: true },
              champion: { type: String, required: true },
            },
          ],
          required: true,
        },
        draft2: {
          type: [
            {
              pseudo: { type: String, required: true },
              champion: { type: String, required: true },
            },
          ],
          required: true,
        },
        statsTeam1: [
          {
            joueur: String, // Exemple : "Eika"
            kills: Number, // Exemple : 1
            deaths: Number, // Exemple : 1
            assists: Number, // Exemple : 1
          },
        ],
        statsTeam2: [
          {
            joueur: String, // Exemple : "Eika"
            kills: Number, // Exemple : 1
            deaths: Number, // Exemple : 1
            assists: Number, // Exemple : 1
          },
        ],
        mvp: String, // Joueur MVP pour cette game
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('LoLMatch', LoLMatchSchema);
