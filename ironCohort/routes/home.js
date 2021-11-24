const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")

router.get('/home', (req, res, ) => {
    res.render('auth/home.hbs')
  })

  module.exports = router;