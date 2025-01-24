const express = require('express');
const verifyToken = require('../middleware/auth');

const models = {
  lol: require('../models/LoLMatch'),
  rocketleague: require('../models/RocketLeagueMatch'),
  fortnite: require('../models/Fortnite'),
  valorant: require('../models/ValorantMatch'),
  tft: require('../models/TFTMatch'),
  aoe: require('../models/AoEMatch'),
  cod: require('../models/CODMatch'),
};

const router = express.Router();

// Vérification de rôle admin pour toutes les routes
router.use(verifyToken, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé. Rôle admin requis.' });
  }
  next();
});

// Obtenir toutes les entrées pour un jeu
router.get('/:game', async (req, res) => {
  const model = models[req.params.game];
  if (!model) return res.status(400).json({ message: 'Jeu non valide.' });

  const { page = 1, limit = 10, ...filters } = req.query; // Pagination + filtres
  const skip = (page - 1) * limit;

  try {
    const data = await model.find(filters).limit(limit * 1).skip(skip);
    const total = await model.countDocuments(filters);

    res.status(200).json({
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des données.', error });
  }
});

// Importer au format JSON
router.get('/:game/export/json', async (req, res) => {
  const model = models[req.params.game];
  if (!model) return res.status(400).json({ message: 'Jeu non valide.' });

  try {
    const data = await model.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'exportation.', error });
  }
});

// Importer au format CSV
const { Parser } = require('json2csv');

router.get('/:game/export/csv', async (req, res) => {
  const model = models[req.params.game];
  if (!model) return res.status(400).json({ message: 'Jeu non valide.' });

  try {
    const data = await model.find();
    const fields = Object.keys(data[0]._doc); // Génère les colonnes automatiquement
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.setHeader('Content-Type', 'text/csv');
    res.attachment(`${req.params.game}_data.csv`);
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'exportation.', error });
  }
});

// Ajouter une nouvelle entrée
router.post('/:game', async (req, res) => {
  const model = models[req.params.game];
  if (!model) return res.status(400).json({ message: 'Jeu non valide.' });

  try {
    const newEntry = new model(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Entrée ajoutée avec succès.', newEntry });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout des données.', error });
  }
});

// Modifier une entrée existante
router.put('/:game/:id', async (req, res) => {
  const model = models[req.params.game];
  if (!model) return res.status(400).json({ message: 'Jeu non valide.' });

  try {
    const updatedEntry = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEntry) return res.status(404).json({ message: 'Entrée non trouvée.' });
    res.status(200).json({ message: 'Entrée mise à jour avec succès.', updatedEntry });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des données.', error });
  }
});

// Supprimer une entrée existante
router.delete('/:game/:id', async (req, res) => {
  const model = models[req.params.game];
  if (!model) return res.status(400).json({ message: 'Jeu non valide.' });

  try {
    const deletedEntry = await model.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ message: 'Entrée non trouvée.' });
    res.status(200).json({ message: 'Entrée supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression des données.', error });
  }
});

module.exports = router;
