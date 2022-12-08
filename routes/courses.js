'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { User, Course } = require('../models');
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();

// GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
router.get();

// GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.


// POST route that will create a new course and return a 201 HTTP status code and no content.


// PUT route that will update the corresponding course and return a 204 HTTP status code and no content.


// DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
router.delete("/courses/:id", authenticateUser, asyncHandler(async (req,res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course) {
            
        }
    } catch (error) {
        console.log('Error: ', error.message);
    }
    
    
    
    await records.deleteQuote(quote);
    res.status(204).end();
}));


module.exports = router;