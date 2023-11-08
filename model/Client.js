const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    taxnumber: {
        type: String,
        required: true
    },
    segment: {
        type: String,
        required: true
    },
    headquarters: {
        type: String,
        required: true
    },
    foundation: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Client', clientSchema);