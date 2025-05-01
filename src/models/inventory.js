const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({

    itemName: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true },

    expiryDate: { type: String, required: true },
    itemStatus: { type: String, default: 'In Stock' }

}, { collection: 'inventory_tbl' });

module.exports = mongoose.model('Inventory', inventorySchema);