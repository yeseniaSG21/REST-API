'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { User, Course } = require('../models');
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();

