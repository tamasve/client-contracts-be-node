const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractSchema = new Schema({
    contract_id: {
        type: String,
        required: true
    },
    client_taxnumber: {
        type: String,
        required: true
    },
    asset_num: {
        type: Number,
        required: true
    },
    asset_type: {
        type: String,
        required: true
    },
    gross_asset_value: {
        type: Number,
        required: true
    },
    financed_amount: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    margin: {
        type: Number,
        required: true
    },
    remaining_debt: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Contract', contractSchema);