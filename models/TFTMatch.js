const mongoose = require('mongoose');

const ClassementSchema = new mongoose.Schema({
  joueurPseudo: { // Renommé pour éviter "joueur"
    type: String,
    required: true, // Exemple : "Enzosx"
  },
  positionClassement: { // Renommé pour éviter toute confusion
    type: Number, // Classement dans la game (1 à 8)
    required: true,
  },
});

const GameSchema = new mongoose.Schema({
  numeroGame: { // Renommé pour plus de clarté
    type: Number, // Numéro de la game
    required: true,
  },
  classement: {
    type: [ClassementSchema], // Classement des joueurs pour cette game
    required: true,
  },
});

const SegmentSchema = new mongoose.Schema({
  segmentType: { // Renommé pour plus de clarté
    type: String, // "day" ou "round"
    enum: ["day", "round"],
    required: true,
  },
  numeroSegment: { // Renommé pour plus de clarté
    type: Number, // Numéro du jour ou du round
    required: true,
  },
  dateSegment: { // Renommé pour éviter la confusion avec la date globale
    type: Date, // Date du jour ou du round
    required: true,
  },
  games: {
    type: [GameSchema], // Liste des games dans ce segment
    required: true,
  },
});

const TFTEventSchema = new mongoose.Schema({
  dateEvent: { // Renommé pour éviter toute confusion
    type: Date,
    required: true, // Date de début du tournoi
  },
  nomTournoi: {
    type: String,
    required: true, // Exemple : "Golden Spatula Cup"
  },
  formatTournoi: { // Renommé pour plus de clarté
    type: String, // Exemple : "Group Stage + Finals"
    default: "Inconnu",
  },
  nombreTotalJoueurs: {
    type: Number, // Nombre total de joueurs dans le tournoi
    required: false, // Optionnel
  },
  joueursM8: {
    type: [String], // Liste des joueurs représentant M8
    required: true, // Exemple : ["Enzosx", "L3scoco"]
  },
  segments: {
    type: [SegmentSchema], // Liste des segments (days ou rounds)
    required: true,
  },
  topFinalJoueursM8: {
    type: [
      {
        joueurPseudo: { // Renommé ici aussi pour être cohérent
          type: String,
          required: true, // Exemple : "Enzosx"
        },
        topFinalClassement: { // Renommé pour éviter les conflits
          type: String, // Classement final du joueur dans le tournoi
          required: true,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("TFTEvent", TFTEventSchema);
