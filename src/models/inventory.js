const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({

    itemName: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: String, required: false },
    quantity: { type: String, required: true },

    expiryDate: { type: String, required: true },
    itemStatus: { type: String, required: true }

}, { collection: 'inventory_tbl' });

module.exports = mongoose.model('Inventory', inventorySchema);