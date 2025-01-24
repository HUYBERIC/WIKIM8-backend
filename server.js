const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes de base
app.get('/', (req, res) => {
  res.send('API Gentle Mates - Backend Ready!');
});

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Enregistrer les routes d'authentification
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Routes pour les résultats de matchs
const routes = [
  { path: '/api/lol', route: require('./routes/lolMatches') },
  { path: '/api/rocketleague', route: require('./routes/rocketLeagueMatches') },
  { path: '/api/fortnite', route: require('./routes/fortniteMatches') },
  { path: '/api/valorant', route: require('./routes/valorantMatches') },
  { path: '/api/tft', route: require('./routes/tftMatches') },
  { path: '/api/aoe', route: require('./routes/aoeMatches') },
  { path: '/api/cod', route: require('./routes/codMatches') },
];

routes.forEach(({ path, route }) => {
  app.use(path, route);
});

// Routes pour les admin
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);






