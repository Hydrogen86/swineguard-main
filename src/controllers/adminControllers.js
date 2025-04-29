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

//get admin data
exports.adminData = async (req, res) => {
    try {
        // Get the logged-in admin by ID (assuming JWT token is used)
        const adminData = await Admin.findById(req.user.userId);

        if (!adminData) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Add fullName to the response object
        const adminResponse = {
            _id: adminData._id,
            firstName: adminData.firstName,
            middleName: adminData.middleName,
            lastName: adminData.lastName,
            adminContact: adminData.adminContact,
            adminAddress: adminData.adminAddress,
            adminEmail: adminData.adminEmail,
            adminPassword: adminData.adminPassword
        };

        res.status(200).json(adminResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}