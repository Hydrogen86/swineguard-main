const User = require('../../models/user');
// console.log('JWT_SECRET:', process.env.JWT_SECRET); //display my secret key

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid Email' });

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid Password' });

    // ✅ Allow only staff roles
    const allowedRoles = ['admin', 'ac_staff', 'ic_staff'];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Access denied. Only staff can log in here.' });
    }

    // 🔑 Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server error: JWT_SECRET is missing' });
    }

    // 🪙 Generate token with role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            fullName: `${user.firstName} ${user.middleName} ${user.lastName}`,
            address: `${user.barangay} ${user.municipality}`,
            email: user.email,
            role: user.role
        }
    });

    } catch (error) {
        console.error('Login error:', error);
        console.log('User role from DB:', user.role);
        res.status(500).json({ error: 'Server error' });
    }
    };

//get admin data
exports.getVetStaffData = async (req, res) => {
    try {
        
        const adminData = await User.findById(req.user.userId);

        if (!adminData) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Add fullName to the response object
        const adminResponse = {
            _id: adminData._id,
            firstName: adminData.firstName,
            middleName: adminData.middleName,
            lastName: adminData.lastName,
            contact: adminData.contact,
            barangay: adminData.barangay,
            municipality: adminData.municipality,
            email: adminData.email,
            password: adminData.password,
            role: adminData.role
        };

        res.status(200).json(adminResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}