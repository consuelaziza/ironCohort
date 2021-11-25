const router = require('express').Router();
const User = require('../models/User');
 

router.get('/edit-profile', (req, res, next) => {
    const id =  req.session.myProperty._id;
    User.findById(id)
    
    .then( (user) => {
        console.log( req.session.myProperty._id);
        res.render('about/editProfile.hbs', { user })
    })
   
    .catch( (err) => next(err));
})

// Handles edit profile requests to `/edit`
// router.post('/edit-profile', (req, res, next) => {
//     //all the form data will be available inside req.body
//     console.log(  req.body )
//     const {username, city} = req.body
//     //Insert the title and description in the DB
//     //IMPORT YOUR post AT THE TOP OF THE FILE
//     User.create({username, city, userId: req.session.myProperty._id})
//         .then(() => {
//             //redirect the user to home page
//             // redirects it to a certain url path
//             res.redirect('/edit-profile')
//         })
//         .catch(() => {
//             next('Edit Profile failed')
//         })
//   })
  // Handles GET requests to `/todo/:somethingDynamic`
  router.get('/edit-profile/:edit-profileId/edit', (req, res, next) => {
      const {editProfileId} = req.params
      User.findById(editProfileId)
          .then((editProfile) => {
              //render some HBS file with that todo information
              res.render('auth/profile.hbs', {editProfile})
          })
          .catch(() => {
              next('edit profile fetch failed')
          })
  })
  
  // Handles POST requests to `/edit profile/235y38sdf23423/edit
  router.post('/edit-profile/:edit-profileId/edit', (req, res, next) => {
      //We get this information from the form that the user submits
      const {username, city} = req.body
      // we grab the dynamic id from the url
      const {editprofileId} = req.params
      // Find that specific todo by id and update it
      console.log(req.body, req.params)
      User.findByIdAndUpdate(editprofileId, {username, city})
          .then(() => {
              res.redirect('/')
          })
          .catch(() => {
              next('Profile Edit failed')
          })
  })
  // Handles GET requests to `/todos/235y38sdf23423/delete
  router.get('/edit-profile/:edit-profileId/delete', (req, res, next) => {
      //grab the postId from the url
      const {editProfileId} = req.params
      // Delete from the database
      User.findByIdAndDelete(editProfileId)
          .then(() => {
              //then send the user to the home page
              res.redirect('auth/profile.hbs')
          })
          .catch(() => {
              next('Profile delete failed')
          })
  })
  module.exports = router;