const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import du modèle User

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création d'un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription.', error });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Requête reçue avec email:', email);

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    console.log('Utilisateur trouvé:', user);

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Mot de passe incorrect');
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    console.log('Mot de passe valide');

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    console.log('Token généré:', token);

    res.status(200).json({ message: 'Connexion réussie !', token });
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion.', error });
  }
});

// Route protégée pour tester le middleware

const verifyToken = require('../middleware/auth');

router.get('/protected-route', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Vous avez accédé à une route protégée !',
    user: req.user, // Informations du token décodé
  });
});


module.exports = router;
