const mongoose = require('mongoose');

const salleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Salle", salleSchema);
