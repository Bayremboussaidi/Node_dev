const Salle = require("../models/salle");
const Reservation = require("../models/Reservation");

// GET /api/salles (Récupérer toutes les salles)
exports.getAllSalles = async (req, res) => {
    try {
        const salles = await Salle.find();
        if (!salles || salles.length === 0) {
            return res.status(404).json({ message: "Aucune salle trouvée" });
        }
        res.status(200).json(salles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/salles/:id (Récupérer une salle par son ID)
exports.getSalleById = async (req, res) => {
    try {
        const salle = await Salle.findById(req.params.id);
        if (!salle) {
            return res.status(404).json({ message: "Salle introuvable" });
        }
        res.status(200).json(salle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/salles (Ajouter une nouvelle salle)
exports.addSalle = async (req, res) => {
    try {
        const { nom, capacite, dispo } = req.body;
        if (!nom || !capacite) {
            return res.status(400).json({ message: "Le nom et la capacité sont requis nn" });
        }
        const salle = await Salle.create({ nom, capacite, dispo });
        res.status(201).json(salle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/salles/:id (Mettre à jour une salle)
exports.updateSalle = async (req, res) => {
    try {
        const { nom, capacite, dispo } = req.body;
        const salle = await Salle.findByIdAndUpdate(req.params.id, { nom, capacite, dispo }, { new: true });
        if (!salle) {
            return res.status(404).json({ message: "Salle introuvable" });
        }
        res.status(200).json(salle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/salles/:id (Supprimer une salle)
exports.deleteSalle = async (req, res) => {
    try {
        const salle = await Salle.findById(req.params.id);
        if (!salle) {
            return res.status(404).json({ message: "Salle introuvable" });
        }
        await Reservation.deleteMany({ salleId: salle._id });
        await Salle.findByIdAndDelete(salle._id);
        res.status(200).json({ message: "Salle supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
