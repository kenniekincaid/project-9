const express = require('express');
const router = express.Router();
const { User } = require('../models');

/**USER ROUTES*/
//Send a GET request to /api/users to READ currently authenticated user.
router.get('/', (req, res, next) => {
  res.json({ message: "I'm a valid user!"}); //WORKING!!!
});

// //Get a user
// router.get('/:id', function (req, res, next) {
//   res.json({message: `You've successfully requested user ID#: ${req.params.id}`});
// });

//Send a POST request to /api/users to CREATE a user, sets location header to '/', returns no content,.
router.post('/', (req, res) => {
  //Get user from the request body
  const user = req.body.id;
  const errors = [];
  
  //Validate that we have a 'first name' value.
  if (!User.firstName){
    errors.push('Please provide a value for first name');
  }

  //Validate that we have a 'last name' value.
  if (!User.lastName){
    errors.push('Please provide a value for last name');
  }
  
  //Validate that we have an 'email' value.
  if (!User.emailAddress){
    errors.push('Please provide a value for email address')
  }
  
  //If there are any errors...
  if (errors.length > 0){
    //Return the validation errors to the client.
    res.status(400).json({ errors });
  } else {
    //Add user to `users` array.
    users.push(user);
    //Set the status to 201 Created and end the response.
    res.status(201).end();
  }
});

module.exports = router;