const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uploader = require("../middleware/cloudinary")


// Handles GET requests to /signin and shows a form
  router.get('/', (req, res, next) => {
  res.render('auth/login.hbs')
})

// Handles GET requests to /signup and shows a form
router.get('/signup', (req, res, next) => {
res.render('auth/signup.hbs')
})

// Handles POST requests to /signup 
router.post('/signup', (req, res, next) => {
  const {username, email, password} = req.body
  
  
  // VALIDATIONS
  

  if (username == '' || email == '' || password == '') {
      //throw error
      res.render('auth/signup.hbs', {error: 'Please enter all fields'})
      return;
  }

  //Validate if the password is strong
  // let passRegEx = /'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'/
  // if (!passRegEx.test(password)) {
  //   res.render('auth/signup.hbs', {error: 'Please enter Minimum eight characters, at least one letter and one number for your password'})
  //   return;
  // }

  // // Email validation
  // let emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  // if (!emailRegEx.test(email)) {
  //   res.render('auth/signup.hbs', {error: 'Please enter a valid email dude'})
  //   return;
  // }

  
  // Encryption

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  User.create({username, email, password: hash})
    .then(() => {
        res.redirect('/')
    })
    .catch((err) => {
      next(err)
    })

})

// Handles POST requests to /signin 
router.post('/login', (req, res, next) => {
  const {email, password} = req.body
  
  //DO Validations First

  // Find the user email
  console.log('Emial is ', email)
  User.find({email})
    .then((emailResponse) => {
        // if the email exists check the password
        if (emailResponse.length) {
            //bcrypt decryption 
            let userObj = emailResponse[0]

            // check if password matches
            let isMatching = bcrypt.compareSync(password, userObj.password);
            if (isMatching) {
                // loggedInUser = userObj
                req.session.myProperty = userObj
                // req.session.welcome = 'Helllo'

                res.redirect('/profile')
            }
            else {
              res.render('auth/login.hbs', {error: 'Password not matching'})
              return;
            }
        }
        else {
          res.render('auth/login.hbs', {error: 'User email does not exist'})
          return;
        }
    })
    .catch((err) => {
      next(err)
    })
})

const checkLogIn = (req, res, next) => {
if (req.session.myProperty){
  next()
}
else {
res.redirect('/')
}
}
router.get('/profile', checkLogIn, (req, res, next) => {
  let id = req.session.myProperty._id 
  User.findById(id)
    .then((myUserInfo) => {
      console.log(myUserInfo)
      User.find()
        .then((allusers) => {
          let friends = allusers.filter((singleUser) => {
            return singleUser.email !== myUserInfo.email
          })
          console.log(friends)
          res.render('auth/profile.hbs', {myUserInfo, friends})
        })
        .catch((err) => {
          next(err)
        })
      
    })
    .catch((err) => {
      next(err)
    })
  
})

router.get('/search', checkLogIn, (req, res, next) => {
  res.send('Search page')
})

router.get('/logout', (req, res, next) => {
  // Deletes the session
  // this will also automatically delete the session from the DB
  req.session.destroy()
  res.redirect('/')
})

router.post("/upload", checkLogIn, uploader.single("image"),(req, res, next) => {
  console.log();
  User.findByIdAndUpdate(req.session.myProperty._id, {
    profilePicture: req.file.path,
  })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log("Image failed to upload", err);
    });
}
);


module.exports = router;

