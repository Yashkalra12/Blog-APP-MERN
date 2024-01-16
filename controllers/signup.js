// const User = require('../models/User');
// exports.signUp = async(req,res)=>{
//     const {username,email,password} = req.body;
//     const exUser = await User.findOne({email:email});
//     const exUser1 = await User.findOne({username:username});
//     if(exUser){
//         return res.status(501).json({
//             success:false,
//             message:"Email Id already exists!!",
//             reponse:exUser
//         })
//     }
//     if(exUser1){
//         return res.status(501).json({
//             success:false,
//             message:"Username already exists!!",
//             reponse:exUser
//         })
//     }
//     const newUser = await User.create({username,email,password});
//     res.redirect('/login');
// }

const crypto = require('crypto');
const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');

};



const User = require('../models/User');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yashkalra2013@gmail.com',
        pass: 'nvzq ifba baop gzyn',
    },
});
exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const exUser = await User.findOne({ email: email });
    const exUser1 = await User.findOne({ username: username });
    if (exUser) {
        return res.status(501).json({
            success: false,
            message: "Email Id already exists!!",
            reponse: exUser
        })
    }
    if (exUser1) {
        return res.status(501).json({
            success: false,
            message: "Username already exists!!",
            reponse: exUser
        })
    }
    const newUser = await User.create({ username, email, password });
    const verificationToken = generateVerificationToken();
    req.session.verificationToken = verificationToken;
    const verificationLink = `http://localhost:3000/verify?token=${verificationToken}&id=${newUser._id}`;
    const mailOptions = {
        from: 'yashkalra2013@gmail.com',
        to: newUser.email,
        subject: 'Verify your Email',
        html: `Click < a href="${verificationLink}" > here</> to verify your email`,

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
    res.redirect('/waiting');
}