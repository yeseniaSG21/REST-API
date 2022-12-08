'use strict';

const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');
const bcrypt = require('bcrypt');

// Construct a router instance.
const router = express.Router();

// Return all properties and values for the currently authenticated User 
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
    });
}));

// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
    // Store errors
    const errors = [];

    try {
        // Validate that we have a `password` value.
        let password = req.body.password;
        if (password.length < 8 || password.length > 20) {
            errors.push('Your password should be between 8 and 20 characters');
        } else {
            password = bcrypt.hashSync(password, 10);
        }
        await User.create(req.body);
        res.status(201).header('Location' , '/').send()
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
}));

module.exports = router;