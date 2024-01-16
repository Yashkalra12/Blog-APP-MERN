const Pending = require('../models/Pending');

exports.getPending = async(req,res)=>{
    try{
        const blogs = await Blog.find({}).populate('user');
        req.session.blogs = blogs;
        res.redirect('/allblogs');
    }catch(e){
        res.send(e.message);
    }
}