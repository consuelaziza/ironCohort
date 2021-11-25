const router = require("express").Router();
const User = require("../models/User");

// router.get('/about', (req, res, next) => {
//     res.render('about/about.hbs')
//   })

//   router.get('/about', (req, res, next) => {
//     const id =  req.session.myProperty._id;
//     User.findById(id)
    
//     .then( (user) => {
//         console.log( req.session.myProperty._id);
//         res.render('about/about.hbs', { user })
//     })
   
//     .catch( (err) => next(err));
// })

//   module.exports = router;


  // GET '/posts' to show all posts in a list
  router.get('/about', (req, res, next) => {
    User.find()
    .then( (about) => res.render('about/about.hbs', { about }))
    .catch( (err) => next(err));
  })
  module.exports = router;