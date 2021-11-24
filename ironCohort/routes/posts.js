const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// router.post("/post", (req, res, next) => {
//   //all the form data will be available inside req.body
//   console.log(  req.body )
//   const {title, description} = req.body
//   //Insert the title and description in the DB
//   //IMPORT YOUR TODOMODEL AT THE TOP OF THE FILE
//   Post.create({title, description})
//       .then(() => {
//           //redirect the user to home page
//           // redirects it to a certain url path
//           res.redirect("/")
//       })
//       .catch(() => {
//           next('Post creation failed')
//       })
// });




// Handles POST requests to `/posts/create`
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
          res.redirect('/profile')
      })
      .catch(() => {
          next('Post creation failed')
      })

})



module.exports = router;