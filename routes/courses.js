'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { User, Course } = require('../models');
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();

// GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
router.get("/courses", asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: [ 'firstName', 'lastName', 'emailAddress' ],
            }
        ]
    });
    res.status(200).json(courses);
}));

// GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
router.get('/courses/:id', authenticateUser, asyncHandler(async (req, res) => { 

}));

// POST route that will create a new course and return a 201 HTTP status code and no content.
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => { 

}));

// PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
router.post('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    let course;
    try {
        course = await Course.findByPk(req.params.id);
        if (course) {
            await Course.update(req.body);
            res.redirect("/"); 
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            course = await Course.build(req.body);
            course.id = req.params.id;
            res.render("courses/update-course", { Course, errors: error.errors, title: "Edit course Entry" })
        } else {
            throw error;
        }
    }
}));

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