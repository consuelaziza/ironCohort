const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")

// GET '/user/:id/edit' route to show the user edit form to the user
router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params
    
    User.findById(id)
    .then( (oneUser) => {
      // before rendering the edit form with the Movie info, we make a second mongoose call to get also all celebrities.
      
      
        // rendering the edit form with both data
        res.render('about/editProfile.hbs', { oneUser })
      })
      .catch( (err) => next(err));
    })
 
  
  // POST '/movies/:id/edit' route to edit the movie
  router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then( () => res.redirect(`/movies/${id}`))
    .catch( (err) => next(err));
  })
  