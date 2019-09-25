const express = require('express');
const router = express.Router();
const { User } = require('../models');

/**USER ROUTES
 */
// //Send a GET request to /api/users to READ currently authenticated user.
router.get('/', (req, res, next) => {
  res.json({ message: "I'm a valid user!"});
});

module.exports = router;
