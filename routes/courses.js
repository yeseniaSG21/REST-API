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
        attributes: [ 'id', 'title', 'description', 'userId' ],
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
router.get('/courses/:id', asyncHandler(async (req, res) => { 
    const course = await Course.findByPk(req.params.id, {
        attributes: [ 'id', 'title', 'description', 'userId' ],
        include: [
            {
                model: User,
                as: 'as',
                attributes: [ 'firstName', 'lastName', 'emailAddress' ],
            }
        ]
    });
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course with that id was not found.' });
    }
}));

// POST route that will create a new course and return a 201 HTTP status code and no content.
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => { 
    try {
        const course = await Course.create(req.body);
        res.status(201).location(`/courses/${course.id}`);
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
}));

// PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        let course = await Course.findByPk(req.params.id);
        if (course) {
            await Course.update(req.body);
            res.status(204).end(); 
        } else {
            res.sendStatus(404).json({ message: 'Course Not Found.' });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
}));

// DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req,res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course) {
            if (course.userId == req.currentUser.id) {
                await course.destroy();
                res.status(204).end();
            } else {
                res.status(403).json({ message: 'Access not permitted.' });
            }
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.log('Error: ', error.message);
    }
}));

module.exports = router;