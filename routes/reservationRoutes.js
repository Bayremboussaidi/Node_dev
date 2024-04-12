const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

// GET /api/reservations/user (Liste des réservations de l'utilisateur connecté)
router.get('/user', isLoggedIn, reservationController.listByUser);

// POST /api/reservations (Créer une nouvelle réservation)
router.post('/', isLoggedIn, reservationController.create);

// PUT /api/reservations/:id (Mettre à jour une réservation)
router.put('/:id', isLoggedIn, reservationController.update);

// DELETE /api/reservations/:id (Annuler une réservation)
router.delete('/:id', isLoggedIn, reservationController.cancel);

// GET /api/reservations/salles/:idSalle/add (Afficher le formulaire d'ajout d'une réservation pour une salle spécifique)
router.get('/salles/:idSalle/add', reservationController.afficheFormAdd);

module.exports = router;
