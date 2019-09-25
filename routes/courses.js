const express = require('express');
const router = express.Router();
const { Course } = require('../models');

/* GET courses listing. */
router.get('/', function(req, res, next) {
    res.json({message: "You have successfully requested all courses!"}); //WORKING!!!
});

/* GET a course. */
router.get('/:id', function (req, res, next) {
    res.json({message: `You have successfully requested course ID#: ${req.params.id}`}); //WORKING!!!
});

//Send a POST request to api/courses to CREATE a new course, SET LOCATION to URI for the course, and returns no content.
router.post('/', (req, res) => {
    //Get course from the request body
    const course = req.body;
    //Add course to `courses` array.
    courses.push(course);
    //Set the status to 201 Ceated and end the response.
    res.status(201).end();
});

//DELETE a course (w/wo auth).
router.delete('/:id', (req, res, next) => {
Course.findByPk(req.params.id).then( async function(course){
    if(course) {
    await course.destroy();
    res.redirect('/');
    } else {
    res.send(404);
    }
}).catch(function(error){
    res.send(500, error);
    });
});

module.exports = router;