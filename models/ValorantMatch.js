const mongoose = require('mongoose');

const ValorantMatchSchema = new mongoose.Schema(
  {
    equipe1: {
      nom: {
        type: String, // Exemple : "Gentle Mates"
        required: true,
      },
      headCoach: {
        type: String, // Exemple : "Coach A"
        required: true,
      },
      assistantCoach: {
        type: String, // Exemple : "Assistant Coach A"
        required: true,
      },
    },
    equipe2: {
      nom: {
        type: String, // Exemple : "Apeks"
        required: true,
      },
      headCoach: {
        type: String, // Exemple : "Coach B"
        required: true,
      },
      assistantCoach: {
        type: String, // Exemple : "Assistant Coach B"
        required: true,
      },
    },
    date: {
      type: Date, // Exemple : "2024-12-15"
      required: true,
    },
    event: {
      type: String, // Exemple : "VCT"
      required: true,
    },
    enjeu: {
      type: String, // Exemple : "Match officiel"
      required: true,
    },
    bo: {
      type: String, // Exemple : "BO3"
      required: true,
    },
    scoreFinal: {
      type: String, // Exemple : "2 - 1"
      required: true,
    },
    mvpGlobal: {
      type: String, // Joueur MVP pour tout le BO
      required: true,
    },
    topKills: {
      joueur: { type: String, required: true }, // Joueur avec le plus de kills
      kills: { type: Number, required: true },
    },
    topAssists: {
      joueur: { type: String, required: true }, // Joueur avec le plus d'assists
      assists: { type: Number, required: true },
    },
    bestRatio: {
      joueur: { type: String, required: true }, // Joueur avec le meilleur ratio K/D
      ratio: { type: Number, required: true },
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
              agents: { type: String, required: true },
            },
          ],
          required: true,
        },
        draft2: {
          type: [
            {
              pseudo: { type: String, required: true },
              agents: { type: String, required: true },
            },
          ],
          required: true,
        },
        statsTeam1: [
          {
            joueur: String, // Exemple : "Click"
            kills: Number, // Exemple : 1
            deaths: Number, // Exemple : 1
            assists: Number, // Exemple : 1
          },
        ],
        statsTeam2: [
          {
            joueur: String, // Exemple : "Click"
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

module.exports = mongoose.model('ValorantMatch', ValorantMatchSchema);
