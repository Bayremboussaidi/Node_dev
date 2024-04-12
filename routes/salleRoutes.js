const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salleController');

// GET /api/salles (Récupérer toutes les salles)
router.get('/', salleController.getAllSalles);

// GET /api/salles/:id (Récupérer une salle par ID)
router.get('/:id', salleController.getSalleById);

// POST /api/salles (Ajouter une nouvelle salle)
router.post('/', salleController.addSalle);

// PUT /api/salles/:id (Mettre à jour une salle par ID)
router.put('/:id', salleController.updateSalle);

// DELETE /api/salles/:id (Supprimer une salle par ID)
router.delete('/:id', salleController.deleteSalle);

module.exports = router;
