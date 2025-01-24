const express = require('express');
const FortniteCompetition = require('../models/Fortnite');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Ajouter une compétition (admin uniquement)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé.' });
  }

  try {
    const competition = new FortniteCompetition(req.body);
    await competition.save();
    res.status(201).json({ message: 'Compétition ajoutée avec succès !', competition });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la compétition.', error });
  }
});

// Récupérer toutes les compétitions
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, nomCompetition, classementFinal } = req.query;

  try {
    const query = {};
    if (nomCompetition) query.nomCompetition = nomCompetition;
    if (classementFinal) query.classementFinal = classementFinal;

    const competitions = await FortniteCompetition.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await FortniteCompetition.countDocuments(query);

    res.status(200).json({
      competitions,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des compétitions.', error });
  }
});


// Récupérer une compétition spécifique
router.get('/:id', async (req, res) => {
  try {
    const competition = await FortniteCompetition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Compétition non trouvée.' });
    }
    res.status(200).json(competition);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la compétition.', error });
  }
});

// Modifier une compétition (admin uniquement)
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé.' });
  }

  try {
    const competition = await FortniteCompetition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!competition) {
      return res.status(404).json({ message: 'Compétition non trouvée.' });
    }
    res.status(200).json({ message: 'Compétition mise à jour avec succès !', competition });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la compétition.', error });
  }
});

// Supprimer une compétition (admin uniquement)
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé.' });
  }

  try {
    const competition = await FortniteCompetition.findByIdAndDelete(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Compétition non trouvée.' });
    }
    res.status(200).json({ message: 'Compétition supprimée avec succès !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la compétition.', error });
  }
});

module.exports = router;
