const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('leads', LeadSchema);
