const Blog = require('../models/Blogs');
exports.addPending = async(req,res)=>{
    try{
        const {id} = req.body;
        const upPending = await Blog.findByIdAndUpdate(id,{isVerified:true});
        res.redirect('/pending');
    }catch(e){
        res.send(e.message);
    }
}