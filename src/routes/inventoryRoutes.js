const express = require('express');
const path = require('path');
const router = express.Router();
const inventoryController = require('../../src/controllers/inventoryControllers');

//Add appointments
router.post('/add/item', inventoryController.addItem);

// Get all Items in Inventory
router.get('/get/item', inventoryController.getAllItems);

module.exports = router;