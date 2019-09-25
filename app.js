const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const bodyparser = require('body-parser');
const app = express();
// const User = require('../models/user');
const bcrypt = require('bcryptjs');
const basicauth = require('basic-auth');
const routes = require('./routes');

/**MIDDLEWARE SECTION, ENGINE SETUP */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyparser.json.urlencoded({ extended: false }));//parses JSON bodies into JS objects
// app.use(logger('combined'));// to log HTTP requests

/**ROUTES SECTION */
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter);
app.use('/api/users', usersRouter);

/**MIDDLEWARE FOR ROUTE PERMISSIONS (include in routes)
 */
// function authChecker(req, res, next) {
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



/**USER ROUTES
 */
// //Send a GET request to /api/users to READ currently authenticated user.
app.get('/api/users', (req, res, next) => {
  res.json({ message: "I'm a valid user!"});
});

// //Send a POST request to /api/users to CREATE a user, sets location header to '/', returns no content,.
// app.post('/api/users', (req, res, next) => {
//   User.findByPk(req.params.id).then(function(user){
//   //Validate the request body
//   }).then(function(user){
//       if(user) {
//         res.json("user_detail", {
//           firstName:user.firstName,
//           lastName: user.lastName,
//           emailAddress: user.emailAddress,
//           password: user.password
//         });
//       } else {
//         //conditionally return 400 validaton error
//         res.render("page_not_found");
//       }
//     }).catch(function(error){
//         res.send(404);
//     });
//   //hash the user password b/f persisting to database (use bcryptjs npm pkg)
//     const hash = bcrypt.hashSync('bacon', 8);


// // >>>>>> --------  NEED HASHING HELP!!
// //     >>>>>>>> -------- HELP!!!! 
// //         >>>>>>> --------  HELP!!!!
// });




/**COURSES ROUTES
 */
// //Send a GET request to /api/courses to READ a list of courses (include user that owns each course).
// app.get('/courses', async (req, res) => {
//   await res.json(courses);
// });

// //Send a GET request route to /api/courses/:id to READ(view) a course w/course ID (include the user that owns the course).
// app.GET('/api/courses/:id', async (req, res, next) => {
//   const course = await data.courses.find(course => course.id == req.params.id); //if a course id matches...
//   res.json(course); //course number will be returned to the client as JSON.
// });

// //Send a POST request to api/courses to CREATE a new course, SET LOCATION to URI for the course, and returns no content.
// app.post('api/courses', (req, res, next) => {
//   User.findByPk(req.params.id).then(function(user){
//   //Validate the request body: title, description. 
//   }).then(function(course){
//     if(course) {
//       res.json("course_detail", {
//         title: course.title,
//         description: course.description
//       });
//     } else {
//       //conditionally return 400 validaton error
//       res.render("page_not_found");
//     }
//   }).catch(function(error){
//       res.send(404, error);
//   });
// });

// //Send a PUT request to api/courses/:id to UPDATE a course and returns no content. 
// app.put('api/courses/:id', (req, res, next) => {
//   //Validate the request body
//   .then(function(course){
//     if(course) {
//       res.json("course_detail", {
//         title: course.title,
//         description: course.description
//       });
//     } else {
//     //conditionally return 400 validaton errors
//     res.render("page_not_found");
//       }
//     }).catch(function(error){
//         res.send(404, error);
//     });
// });

// //Send a DELETE request route to /api/courses/:id to DELETE a course and returns no content.
// app.delete('/api/courses/:id', (req, res, next) => {
//   Course.findByPk(req.params.id).then( async function(course){
//     if(course) {
//       await course.destroy();
//       res.redirect('/courses');
//     } else {
//       res.send(404);
//     }
//   }).catch(function(error){
//     res.send(500, error);
//     });
// });

/**ERROR HANDLING SECTION */
  // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

  // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Respond with error object
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
