'use strict';

const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();

// Return all properties and values for the currently authenticated User 
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress } = req.currentUser;

    res.json(
        { firstName, lastName, emailAddress }
    );
}))