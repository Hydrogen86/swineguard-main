const Admin = require('../models/admin');
console.log('JWT_SECRET:', process.env.JWT_SECRET); //display my secret key

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login admin
exports.loginAdmin = async (req, res) => {
    try {
        const { adminEmail, adminPassword } = req.body;

        // 🔹 Find Admin by email
        const admin = await Admin.findOne({ adminEmail });
        if (!admin) return res.status(400).json({ error: 'Invalid Email' });

        // 🔹 Compare password using bcrypt
        const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
        if (!isMatch) return res.status(400).json({ error: 'Invalid Password' });

        // 🔹 Ensure JWT_SECRET is not undefined
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'Server error: JWT_SECRET is missing' });
        }

        // 🔹 Generate JWT token
        const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login Successful', token });

    } catch {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}