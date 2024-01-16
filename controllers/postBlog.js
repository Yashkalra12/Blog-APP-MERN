const User = require('../models/User');
const Blog = require('../models/Blogs');
exports.postBlog = async(req,res)=>{
    try{
        const user = req.session.user;
        if(req.session.isAdmin){
            const {category,title,content} = await req.body;
            let newBlog = await Blog.create({category,title,content,isVerified:true,user:user._id});
            let exUser = await User.findByIdAndUpdate(user._id,{$push:{blogs:newBlog._id}},{new:true});
            res.redirect('/home');
        }else{
            const {category,title,content,imageUrl} = await req.body;
            let newBlog = await Blog.create({category,title,content,user:user._id});
            let exUser = await User.findByIdAndUpdate(user._id,{$push:{blogs:newBlog._id}},{new:true});
            res.redirect('/home');
        }
    }catch(e){
        res.send(e.message);
    }
}