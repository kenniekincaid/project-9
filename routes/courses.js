const express = require('express');
const router = express.Router();
const { Course } = require('../models');

/* GET courses listing. */
router.get('/', function(req, res, next) {
    res.send('You have requested a course');
});

// /* GET a course. */
// router.get('/:id', function (req, res, next) {
//     res.send(`You have requested a course ${req.params.id}`);
// });

//when moving routes here, please make suer to ONLY put the very last parameter '/' or '/:id' that you're looking for...
//The place in app.js where you are calling the model will already assign the '/api/course' portion...

module.exports = router;