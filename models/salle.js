const mongoose = require('mongoose');

const salleSchema = mongoose.Schema({
    nom: {
        type: String
        
    },
    capacite: {
        type: Number
    },
    dispo: {
        type: Boolean,
        }
});

module.exports = mongoose.model("Salle", salleSchema);
