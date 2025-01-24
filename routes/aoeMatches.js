const express = require('express');
const AoEMatch = require('../models/AoEMatch');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Ajouter un match (admin uniquement)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé.' });
  }

  try {
    const match = new AoEMatch(req.body);
    await match.save();
    res.status(201).json({ message: 'Match Valorant ajouté avec succès !', match });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du match.', error });
  }
});

// Récupérer tous les matchs
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, competition, scoreBO, mvp } = req.query;

  try {
    const query = {};
    if (competition) query.competition = competition;
    if (scoreBO) query.scoreBO = scoreBO;
    if (mvp) query.mvp = mvp;

    const matchs = await AoEMatch.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await AoEMatch.countDocuments(query);

    res.status(200).json({
      matchs,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des matchs.', error });
  }
});


// Récupérer un match spécifique
router.get('/:id', async (req, res) => {
  try {
    const match = await AoEMatch.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match non trouvé.' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du match.', error });
  }
});

// Modifier un match (admin uniquement)
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé.' });
  }

  try {
    const match = await AoEMatch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) {
      return res.status(404).json({ message: 'Match non trouvé.' });
    }
    res.status(200).json({ message: 'Match mis à jour avec succès !', match });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du match.', error });
  }
});

// Supprimer un match (admin uniquement)
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé.' });
  }

  try {
    const match = await AoEMatch.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match non trouvé.' });
    }
    res.status(200).json({ message: 'Match supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du match.', error });
  }
});

module.exports = router;
