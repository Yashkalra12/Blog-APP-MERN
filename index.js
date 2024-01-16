const express = require('express');
const Blog = require('./models/Blogs');
const User = require('./models/User');
const session = require('express-session');
const dbConnect = require('./config/dbConnect');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const router = require('./routes/router');

app.use(express.json());
app.use(session({ secret: "yashkalra.12" }));
app.set('view engine', 'hbs');
app.use(router);
const isLogged = (req, res, next) => {
    console.log(req.session);
    if (req.session.logged) {
        next();
    } else {
        res.redirect('/');
    }
}
app.get('/home', isLogged, (req, res) => {
    res.render('home', { user: req.session.user, isAdmin: req.session.isAdmin });
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/signup', (req, res) => {
    res.render('signup');
})
app.get('/allblogs', async (req, res) => {
    const blogs = await Blog.find({ isVerified: true }).populate('user');
    res.render('allblogs', { blogs: blogs, isAdmin: req.session.isAdmin });
})
app.get('/myblogs', async (req, res) => {
    const user = req.session.user;
    const blogs = await Blog.find({ user: user._id, isVerified: true });
    res.render('myblogs', { blogs: blogs, isAdmin: req.session.isAdmin });
})
app.get('/pending', async (req, res) => {
    const pending = await Blog.find({ isVerified: false }).populate('user');
    res.render('pending', { pendings: pending, isAdmin: req.session.isAdmin });
})

app.get('/', async (req, res) => {
    const blogs = await Blog.find({ isVerified: true }).populate('user');
    res.render('guest', { blogs: blogs });
})

app.get('/logout', async (req, res) => {
    req.session.logged = false;
    req.session.user = undefined;
    const blogs = await Blog.find({ isVerified: true }).populate('user');
    res.render('guest', { blogs: blogs });
})

app.get('/waiting', (req, res) => {
    res.render('wait');
})
app.get('/verify', async (req, res) => {
    const token = req.query.token;
    const id = req.query.id;
    if (token == req.session.verificationToken) {
        let upUser = await User.findByIdAndUpdate(id, { isVerified: true });
        res.redirect('/login');
    } else {
        // console.log(token);
        // console.log(req.session.verificationToken);
        res.send('Failed to verify your email');
    }
})

dbConnect();
app.listen(3000, () => {
    console.log("Server started at 3000!! ");
})