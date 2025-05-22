const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({

    itemName: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true },

    expiryDate: { type: Date, required: true },
    itemStatus: { type: String, default: 'In Stock' },

    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    createdTime: { type: Date, default:Date.now },
    updatedTime: { type: Date, default:Date.now },
    

}, { collection: 'inventory_tbl' });

module.exports = mongoose.model('Inventory', inventorySchema);