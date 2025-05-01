const inventory = require('../models/inventory');

// Save Invetory Item
exports.addItem = async (req, res) => {
    try {
        const {  itemName, description, amount, quantity, expiryDate, itemStatus } = req.body;
        const item = new inventory({
            itemName, 
            description,
            amount, 
            quantity, 
            expiryDate, 
            itemStatus
        });
        await item.save();
        res.status(201).json({message: 'Item added successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all Data in my db
exports.getAllItems = async (req, res) => {
    try {
        const item = await inventory.find();
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
