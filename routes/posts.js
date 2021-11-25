const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//Create post
// Handles GET requests to 
router.get('/post', (req, res, next) => {
    // sending an hbs form back to the 
    res.render('auth/create-post.hbs')
})

// Handles POST requests to '/post'
router.post('/post', (req, res, next) => {
  //all the form data will be available inside req.body
  console.log(  req.body )
  const {title, desc} = req.body
  //Insert the title and description in the DB

  //IMPORT YOUR post AT THE TOP OF THE FILE
  Post.create({title, desc, userId: req.session.myProperty._id})
      .then(() => {
          //redirect the user to home page

          // redirects it to a certain url path
          res.redirect('/feed')
      })
      .catch(() => {
          next('Post creation failed')
      })

})

// Handles GET requests to `/todo/:somethingDynamic`
router.get('/post/:postId', (req, res, next) => {
    const {postId} = req.params

    Post.findById(postId)
        .then((post) => {
            //render some HBS file with that todo information
            res.render('auth/feed.hbs', {post})
        })
        .catch(() => {
            next('Single post fetch failed')
        })
    
})

// Handles GET requests to `/post/235y38sdf23423/edit
router.get('/post/:postId/edit', (req, res, next) => {
    const {postId} = req.params

    Post.findById(postId)
        .then((post) => {
            //render some HBS file with that post information
            res.render('auth/edit-post.hbs', {post})
        })
        .catch(() => {
            next('Single post fetch failed')
        })

})

// Handles POST requests to `/todos/235y38sdf23423/edit
router.post('/post/:postId/edit', (req, res, next) => {

    //We get this information from the form that the user submits
    const {title, desc} = req.body
    console.log(req.body)

    // we grab the dynamic id from the url
    const {postId} = req.params

    // Find that specific todo by id and update it
   Post.findByIdAndUpdate(postId, {title, desc})
        .then(() => {
            res.redirect('/feed')
        })
        .catch(() => {
            next('Post Edit failed')
        })

})

// Handles GET requests to `/todos/235y38sdf23423/delete
router.get('/post/:postId/delete', (req, res, next) => {
    //grab the postId from the url
    const {postId} = req.params 
    
    // Delete from the database
    Post.findByIdAndDelete(postId)
        .then(() => {
            //then send the user to the home page
            res.redirect('/feed')
        })
        .catch(() => {
            next('Post delete failed')
        })

})




module.exports = router;