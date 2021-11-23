const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")

router.get('/career', (req, res, ) => {
    res.render('auth/career.hbs')
  })

  module.exports = router;