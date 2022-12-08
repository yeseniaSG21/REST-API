'use strict';

const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');
const bcrypt = require('bcrypt');

// Construct a router instance.
const router = express.Router();

// Return all properties and values for the currently authenticated User 
router.get('/', authenticateUser, asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress } = req.currentUser;

    res.json(
        { firstName, lastName, emailAddress }
    );
}))

// Route that creates a new user.
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
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