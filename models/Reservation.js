const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Renommé de userId à user
    salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true }, // Renommé de salleId à salle
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});

module.exports = mongoose.model("Reservation", reservationSchema);
