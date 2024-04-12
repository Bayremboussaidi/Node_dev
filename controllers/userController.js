const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../config/email");

// POST /api/users/signup (Inscription d'un nouvel utilisateur)
const register = async (req, res) => {
    console.log(req.body);

    const { nom, prenom, telephone, email, password } = req.body;
    if (!nom || !prenom || !telephone || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Cette adresse e-mail est déjà utilisée" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            nom,
            prenom,
            telephone,
            email,
            password: hashedPassword
        });

        // Envoi du courriel (s'il est activé)
        // sendMail(user.email, "Inscription", "Bienvenue", false);

        res.status(201).json({ message: "Utilisateur inscrit avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/users/login (Connexion de l'utilisateur)
const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Adresse e-mail et mot de passe sont requis" });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "Adresse e-mail ou mot de passe incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Adresse e-mail ou mot de passe incorrect" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" });

        // Utilisation d'un jeton JWT au lieu de la méthode res.cookie pour authentifier l'utilisateur
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    signIn
};
