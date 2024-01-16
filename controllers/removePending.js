const Blog = require('../models/Blogs');
const User = require('../models/User');
exports.removePending = async(req,res)=>{
    try{
        const {id,user} = req.body;
        const newBlog = await Blog.findByIdAndDelete(id);
        let exUser = await User.findByIdAndUpdate(user,{$pull:{blogs:newBlog._id}},{new:true});
        res.redirect('/pending');
    }catch(e){
        res.send(e.message);
    }
}