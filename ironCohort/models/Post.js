const { Schema, model } = require("mongoose");
require("./User");

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
       type: String
    },

    desc: {
      type: String,
      max: 500,
    }, 
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Post = model("Post", PostSchema)
module.exports = Post;
