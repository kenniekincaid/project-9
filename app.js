/**VARIABLES DEFINED*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const app = express();
const bcrypt = require('bcryptjs');
const basicauth = require('basic-auth');
const routes = require('./routes');

/**MIDDLEWARE SECTION, ENGINE SETUP */
app.use(morgan('dev')); //Gives HTTP request logging
app.use(express.json()); //Body JSON parsing
app.use(express.urlencoded({ extended: false }));


/**ROUTES SECTION */
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);

/**MIDDLEWARE FOR ROUTE PERMISSIONS (include in routes)  */

function asyncHandler(cb){ //MIDDLEWARE function to abstract away repetitive try/catch blocks -- See the 'Refactor w/Express Middleware TH video!
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}
// function authChecker(req, res, next) {//Alternative middleware function
//   if (req.session.auth) {
//       next();
//   } else {
//      res.redirect("/auth");
//   }
// }
// app.use(authChecker);

  //get user cred's from Auth header (contains name value(user email) & pass value(user pwd))
  //parse Auth header into user cred's (use basic-auth npm pkg)
  //retrieve user from db via user email
  //if user found via email address
    //use bycrptjs to check user's hashed pwd with the clear text given
      //if pwd's match
        //set user on the request to allow subsequent malware access to it
      //else if pwd's don't match
        //use this middleware in the GET api/users, POST api/courses, PUT api/courses/:id, & DELETE /api/courses/:id routes.


/**ERROR HANDLING SECTION */
app.use((req, res) => { //Sends 404 if no other routes match
  res.status(404).json({
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => { //Setup a global error handler (from Treehouse).
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? {} : err,
  });
});

module.exports = app;
