const mongoose = require('mongoose');

// Schéma utilisateur
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, { timestamps: true }); // Ajoute automatiquement createdAt et updatedAt

// Export du modèle User
module.exports = mongoose.model('User', UserSchema);
