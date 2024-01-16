const Blog = require('../models/Blogs');
const User = require('../models/User');
exports.getMyBlogs = async(req,res)=>{
    const user = req.session.user;
    const exUser = await User.findById(user._id).populate('blogs').exec();
    res.redirect('/myblogs');
}