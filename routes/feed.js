const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")



  // GET '/posts' to show all posts in a list
router.get('/feed', (req, res, next) => {
    Post.find()
    .then( (allPosts) => res.render('auth/feed.hbs', { allPosts }))
    .catch( (err) => next(err));
  })
  module.exports = router;