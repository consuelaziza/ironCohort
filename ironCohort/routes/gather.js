const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")

router.get('/gather', (req, res, ) => {
    res.render('auth/gather.hbs')
  })

  module.exports = router;