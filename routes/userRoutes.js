const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users/signup (Inscription d'un nouvel utilisateur)
router.post('/signup', userController.register);

// POST /api/users/login (Connexion de l'utilisateur)
router.post('/login', userController.signIn);

module.exports = router;
