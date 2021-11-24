const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

//update user
router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params
  const { username, email, password, profilePicture, coverPicture, followers, followings, isAdmin, desc, city, from, relationship} = req.body
  
  User.findByIdAndUpdate(id, { username, email, password, profilePicture, coverPicture, followers, followings, isAdmin, desc, city, from, relationship })
  .then( () => res.redirect(`./Profile/${id}`))
  .catch( (err) => next(err));
})

//delete user
router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params
  
  User.findByIdAndDelete(id)
  .then( () => res.redirect('/'))
  .catch( (err) => next(err));
})
//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
// router.put("/:id/follow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (!user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $push: { followers: req.body.userId } });
//         await currentUser.updateOne({ $push: { followings: req.params.id } });
//         res.status(200).json("user has been followed");
//       } else {
//         res.status(403).json("you allready follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant follow yourself");
//   }
// });

//unfollow a user

// router.put("/:id/unfollow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//       try {
//         const user = await User.findById(req.params.id);
//         const currentUser = await User.findById(req.body.userId);
//         if (user.followers.includes(req.body.userId)) {
//           await user.updateOne({ $pull: { followers: req.body.userId } });
//           await currentUser.updateOne({ $pull: { followings: req.params.id } });
//           res.status(200).json("user has been unfollowed");
//         } else {
//           res.status(403).json("you dont follow this user");
//         }
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(403).json("you cant unfollow yourself");
//     }
//   });

module.exports = router;
