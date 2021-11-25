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

  // Handles GET requests to `/todo/:somethingDynamic`
  router.get('/edit-profile/:edit-profileId/edit', (req, res, next) => {
      const {editProfileId} = req.params
      User.findById(editProfileId)
          .then(() => {
              //render some HBS file with that todo information
              //res.render('auth/profile.hbs', {editProfile})
              res.send
          })
          .catch(() => {
              next('edit profile fetch failed')
          })
  })
  

  router.post('/edit-profile/:editProfileId/edit', (req, res, next) => {

    //We get this information from the form that the user submits
    const {username, city} = req.body
    console.log(req.body)

    // we grab the dynamic id from the url
    const {editProfileId} = req.params

    // Find that specific todo by id and update it
   User.findByIdAndUpdate(editProfileId, {username, city})
        .then(() => {
            res.redirect('/profile')
        })
        .catch(() => {
            next('Post Edit failed')
        })

})
  // Handles GET requests to `/todos/235y38sdf23423/delete
//   router.get('/edit-profile/:edit-profileId/delete', (req, res, next) => {
//       //grab the postId from the url
//       const {editProfileId} = req.params
//       // Delete from the database
//       User.findByIdAndDelete(editProfileId)
//           .then(() => {
//               //then send the user to the home page
//               res.redirect('auth/profile.hbs')
//           })
//           .catch(() => {
//               next('Profile delete failed')
//           })
//   })
  module.exports = router;