const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // imageUrl: {
  //   type: String,
  //   required: true,
  // },
  isVerified:{
    type:Boolean,
    default:false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Blogs", blogSchema);