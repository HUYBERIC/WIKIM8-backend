const mongoose = require('mongoose');

// Schéma pour une game individuelle
const GameSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
  },
  joueur1Civilisation: {
    type: String,
    required: true,
  },
  joueur2Civilisation: {
    type: String,
    required: true,
  },
  gagnant: {
    type: String, // Nom du joueur gagnant
    required: true,
  },
});

// Schéma principal pour un match AoE
const AoEMatchSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    event: {
      type: String, // Exemple : Red Bull Wololo
      required: true,
    },
    typeBO: {
      type: String, // Exemple : BO3, BO5, BO7
      required: true,
      default: "BO5", // BO5 par défaut
    },
    joueur1: {
      nom: {
        type: String,
        required: true,
      },
      equipe: {
        type: String,
        required: true,
      },
    },
    joueur2: {
      nom: {
        type: String,
        required: true,
      },
      equipe: {
        type: String,
        required: true,
      },
    },
    games: {
      type: [GameSchema],
      validate: {
        validator: function (v) {
          return v.length >= 1;
        },
        message: "Il doit y avoir au moins une game.",
      },
    },
    gagnantFinal: {
      type: String, // Nom du joueur gagnant du BO
      required: true,
    },
    scoreFinal: {
      type: String, // Exemple : "3-2"
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AoEMatch", AoEMatchSchema);
