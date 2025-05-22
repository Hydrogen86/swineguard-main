const User = require('@models/user');
// console.log('JWT_SECRET:', process.env.JWT_SECRET); //display my secret key

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid Email' });

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid Password' });

    // ✅ Allow only client roles
    const allowedRoles = ['client'];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Access denied. Only Swine Raiser can log in here.' });
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
            fullName: `${user.firstName} ${user.middleName} ${user.lastName} ${user.suffix}`,
            address: `${user.barangay} ${user.municipality}`,
            contact: user.contact,
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

//get User data
exports.getuserData = async (req, res) => {
    try {
        
        const userData = await User.findById(req.user.userId);

        if (!userData) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Add fullName to the response object
        const userResponse = {
            _id: userData._id,
            firstName: userData.firstName,
            middleName: userData.middleName,
            lastName: userData.lastName,
            suffix: userData.suffix,
            contact: userData.contact,
            barangay: userData.barangay,
            municipality: userData.municipality,
            email: userData.email,
            password: userData.password,
            role: userData.role
        };

        res.status(200).json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Create User Account
exports.createUserAccount = async (req, res) => {
    try {
        const { firstName, middleName, lastName, suffix, contact, barangay, municipality, email, password, } = req.body;

        // Validate required string fields with min length
        const requiredFields = [
        { field: 'firstName', label: 'First name', min: 2 },
        { field: 'lastName', label: 'Last name', min: 2 },
        { field: 'contact', label: 'Contact number', min: 11 },
        { field: 'barangay', label: 'Barangay', min: 1 },
        { field: 'municipality', label: 'Municipality', min: 1 },
        ];

        for (const { field, label, min } of requiredFields) {
        if (!req.body[field] || req.body[field].length < min) {
            return res.status(400).json({
            message: `${label} is required and must be at least ${min} character${min > 1 ? 's' : ''}.`,
            });
        }
        }

        // Custom checks
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Valid email is required.' });
        }
        if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // ✅ Check if user with same email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // ✅ Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userAccountDetails = new User({
            firstName,
            middleName,
            lastName,
            suffix,

            contact,
            barangay,
            municipality,
            email,
            password: hashedPassword,
        });
        await userAccountDetails.save();
        res.status(201).json({message: 'Account created successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}